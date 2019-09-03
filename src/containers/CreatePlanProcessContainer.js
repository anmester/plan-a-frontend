import React, { useState } from "react";
import "../App.css";
import PlanStep1 from "../components/PlanStep1";
import PlanStep2 from "../components/PlanStep2";
import PlanStep3 from "../components/PlanStep3";
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
    <>
      <div className="plan-select-container">
        <PlanStep1
          activityCategories={activityCategories}
          handleCategoryChange={handleCategoryChange}
        />
        <PlanStep2
          activityCategories={activityCategories}
          handleCategoryChange={handleCategoryChange}
        />
        <PlanStep3
          activityCategories={activityCategories}
          handleCategoryChange={handleCategoryChange}
        />
        <FinalizePlan />
      </div>

      <div className="map-container">
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
    </>
  );
}
