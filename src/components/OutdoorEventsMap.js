import React, { useState, useEffect } from "react";
import "../App.css";
import { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import { setActivity, fetchOutdoorEvents } from "../actions.js";
import LoadingLayer from "./LoadingLayer";

function OutdoorEventsMap(props) {
  const [selectedOutdoorEvent, setSelectedOutdoorEvent] = useState(null);

  useEffect(() => {
    props.fetchOutdoorEvents();
  });

  if (props.outdoorEvents[0]) {
    return (
      <>
        {props.outdoorEvents.map(outdoorEvent => (
          <Marker
            key={outdoorEvent.id}
            latitude={Number(outdoorEvent.latitude)}
            longitude={Number(outdoorEvent.longitude)}
            offsetLeft={-15}
            offsetTop={-14}
          >
            <button
              className="btn btn small"
              onClick={e => {
                e.preventDefault();
                setSelectedOutdoorEvent(outdoorEvent);
              }}
            >
              <i className="fas fa-map-marker-alt" alt="map-marker"></i>
            </button>
          </Marker>
        ))}

        {selectedOutdoorEvent ? (
          <Popup
            latitude={Number(selectedOutdoorEvent.latitude)}
            longitude={Number(selectedOutdoorEvent.longitude)}
            onClose={() => {
              setSelectedOutdoorEvent(null);
            }}
            closeOnClick={false}
            className="correctFont"
          >
            <div>
              <h4>{selectedOutdoorEvent.name}</h4>
              <br></br>
              <button
                onClick={() => {
                  props.setActivity(selectedOutdoorEvent);
                }}
              >
                Make Stop
              </button>
            </div>
          </Popup>
        ) : null}
      </>
    );
  } else {
    return <LoadingLayer />;
  }
}

function msp(state) {
  return {
    activities: state.activities,
    outdoorEvents: state.outdoorEvents
  };
}

function mdp(dispatch) {
  return {
    fetchOutdoorEvents: () => {
      fetchOutdoorEvents(dispatch)();
    },

    setActivity: selectedOutdoorEvent => {
      setActivity(dispatch, selectedOutdoorEvent)();
    }
  };
}

export default connect(
  msp,
  mdp
)(OutdoorEventsMap);
