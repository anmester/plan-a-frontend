import React, { useState } from "react";
import "../App.css";
import PlanStepChoice from "../components/PlanStepChoice";
import PlanInProcess from "../components/PlanInProcess";
import FinalizePlan from "../components/FinalizePlan";
import ReactMapGL from "react-map-gl";
import GalleryMap from "../components/GalleryMap";
import TheaterMap from "../components/TheaterMap";
import RestaurantMap from "../components/RestaurantMap";

export default function CreatePlanProcessContainer(props) {
  const [viewport, setViewport] = useState({
    latitude: 40.74961163174836,
    longitude: -73.98639731142578,
    width: "100vw",
    height: "100vh",
    zoom: 12
  });

  const mapboxToken =
    "pk.eyJ1IjoiYW5tZXN0ZXIiLCJhIjoiY2p6d3R4NW14MHRvNzNkdGF5NDRmb3VxeiJ9.2PwjgvDzOAyvCXmeuSX8SA";

  const activityCategories = [
    "Gallery",
    "Museum",
    "Restaurant",
    "Park",
    "Theater",
    "Bar",
    "Swimming"
  ];

  const [category, setCategory] = useState(null);

  const handleCategoryChange = e => {
    console.log("etarget name", e.target.value);
    e.preventDefault();
    setCategory(e.target.value);
  };

  const renderActivityMap = category => {
    if (category === "Theater") {
      return <TheaterMap />;
    }
    if (category === "Gallery") {
      return <GalleryMap />;
    }
    if (category === "Restaurant") {
      return <RestaurantMap />;
    }
    return null;
  };

  return (
    <div class="container-fluid">
      <div class="row">
        <div className="plan-select-container col-md-4" style={{ top: 40 }}>
          <PlanStepChoice
            activityCategories={activityCategories}
            handleCategoryChange={handleCategoryChange}
          />
          <PlanInProcess />
          <FinalizePlan planInProgress={props.planInProgress} />
        </div>

        <div
          className="map-container col-md-7"
          style={{ position: "fixed", top: 0, right: 123 }}
        >
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={mapboxToken}
            onViewportChange={viewport => {
              setViewport(viewport);
            }}
            activityCategories={activityCategories}
          >
            {renderActivityMap(category)}
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
}
