import React, { useState } from "react";
import "../App.css";
import PlanStepChoice from "../components/PlanStepChoice";
import PlanInProcess from "../components/PlanInProcess";
import FinalizePlan from "../components/FinalizePlan";
import ReactMapGL from "react-map-gl";
import GalleryMap from "../components/GalleryMap";
import TheaterMap from "../components/TheaterMap";
import RestaurantMap from "../components/RestaurantMap";
import OutdoorEventsMap from "../components/OutdoorEventsMap";
import StopsMap from "../components/StopsMap";
import BarMap from "../components/BarMap";
import { connect } from "react-redux";

function CreatePlanProcessContainer(props) {
  const [viewport, setViewport] = useState({
    latitude: 40.7447,
    longitude: -73.9485,
    width: "100vw",
    height: "100vh",
    zoom: 12
  });

  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const activityCategories = [
    "Galleries & Museums",
    "Restaurants",
    "Outdoor Events",
    "Theaters",
    "Bars"
  ];

  const [category, setCategory] = useState(null);

  const handleCategoryChange = e => {
    console.log("etarget name", e.target.value);
    e.preventDefault();
    setCategory(e.target.value);
  };

  const renderActivityMap = category => {
    if (category === "Theaters") {
      return <TheaterMap />;
    }
    if (category === "Galleries & Museums") {
      return <GalleryMap />;
    }
    if (category === "Restaurants") {
      return <RestaurantMap />;
    }
    if (category === "Outdoor Events") {
      return <OutdoorEventsMap />;
    }
    if (category === "Bars") {
      return <BarMap />;
    }
    if (category === "stopMap") {
      return <StopsMap />;
    }
    return null;
  };

  const showStopMap = e => {
    e.preventDefault();
    setCategory("stopMap");
  };

  return (
    <div className="container-fluid" id="form">
      <div className="row">
        <div className="plan-select-container col-md-4" style={{ top: 40 }}>
          <div className="choose-list-finalize">
            <PlanStepChoice
              activityCategories={activityCategories}
              handleCategoryChange={handleCategoryChange}
              showStopMap={showStopMap}
            />
            <PlanInProcess />
            <FinalizePlan planInProgress={props.planInProgress} />
          </div>
        </div>

        <div
          className="map-container col-md-8"
          style={{ position: "fixed", top: 0, right: 0 }}
        >
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={mapboxToken}
            onViewportChange={viewport => {
              setViewport(viewport);
            }}
            activityCategories={activityCategories}
          >
            <StopsMap />
            {renderActivityMap(category)}
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
}

function msp(state) {
  return {
    activities: state.activites
  };
}

export default connect(
  msp,
  null
)(CreatePlanProcessContainer);
