import React, { useState, useEffect } from "react";
import "../App.css";
import { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import { setActivity, fetchTheaters } from "../actions.js";
import LoadingLayer from "./LoadingLayer";

function TheaterMap(props) {
  const [selectedTheater, setSelectedTheater] = useState(null);

  useEffect(() => {
    props.fetchTheaters();
  });

  if (props.theaters[0]) {
    return (
      <>
        {props.theaters.map(theater => (
          <Marker
            key={theater.id}
            latitude={Number(theater.latitude)}
            longitude={Number(theater.longitude)}
            offsetLeft={-15}
            offsetTop={-14}
          >
            <button
              className="btn btn small"
              onClick={e => {
                e.preventDefault();
                setSelectedTheater(theater);
              }}
            >
              <i className="fas fa-map-marker-alt" alt="map-marker"></i>
            </button>
          </Marker>
        ))}

        {selectedTheater ? (
          <Popup
            latitude={Number(selectedTheater.latitude)}
            longitude={Number(selectedTheater.longitude)}
            onClose={() => {
              setSelectedTheater(null);
            }}
            closeOnClick={false}
            id="form"
          >
            <div>
              <h4>{selectedTheater.name}</h4>
              <br></br>
              <button
                onClick={() => {
                  props.setActivity(selectedTheater);
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
    theaters: state.theaters,
    activities: state.activities
  };
}

function mdp(dispatch) {
  return {
    fetchTheaters: () => {
      fetchTheaters(dispatch)();
    },

    setActivity: setSelectedTheater => {
      setActivity(dispatch, setSelectedTheater)();
    }
  };
}

export default connect(
  msp,
  mdp
)(TheaterMap);
