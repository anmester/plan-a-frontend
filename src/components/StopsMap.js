import React, { useState, useEffect } from "react";
import "../App.css";
import { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import PolylineOverlay from "./PolylineOverlay";

function StopsMap(props) {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const stopPoints = props.activities
    ? props.activities.map(activity => [
        Number(activity.longitude),
        Number(activity.latitude)
      ])
    : [];

  if (props.activities[0]) {
    console.log("activities in stops map", props.activities);
    return (
      <>
        <PolylineOverlay points={stopPoints} />
        {props.activities.map(activity => (
          <Marker
            key={activity.id}
            latitude={Number(activity.latitude)}
            longitude={Number(activity.longitude)}
            offsetLeft={-15}
            offsetTop={-14}
          >
            <button
              className="btn btn small"
              onClick={e => {
                e.preventDefault();
                setSelectedActivity(activity);
              }}
            >
              <i alt="stop-pin">🚩</i>
            </button>
          </Marker>
        ))}

        {selectedActivity ? (
          <Popup
            latitude={Number(selectedActivity.latitude)}
            longitude={Number(selectedActivity.longitude)}
            onClose={() => {
              setSelectedActivity(null);
            }}
            closeOnClick={false}
            id="form"
          >
            <div>
              <h4>{selectedActivity.name}</h4>
            </div>
          </Popup>
        ) : null}
      </>
    );
  } else {
    return <h1>.</h1>;
  }
}

function msp(state) {
  return {
    activities: state.activities
  };
}

export default connect(
  msp,
  null
)(StopsMap);
