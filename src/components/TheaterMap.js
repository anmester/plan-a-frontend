import React, { useState } from "react";
import "../App.css";
import { Marker, Popup } from "react-map-gl";
import * as Theater from "../data/nycTheaters.json";
import { connect } from "react-redux";
import { setActivity } from "../actions.js";

function TheaterMap(props) {
  const [selectedTheater, setSelectedTheater] = useState(null);

  return (
    <>
      {Theater.features.map(theater => (
        <Marker
          key={theater.properties.name}
          latitude={theater.geometry.coordinates[1]}
          longitude={theater.geometry.coordinates[0]}
        >
          <button
            className="btn btn small"
            onClick={e => {
              e.preventDefault();
              setSelectedTheater(theater);
            }}
          >
            <i>🎭</i>
          </button>
        </Marker>
      ))}

      {selectedTheater ? (
        <Popup
          latitude={selectedTheater.geometry.coordinates[1]}
          longitude={selectedTheater.geometry.coordinates[0]}
          onClose={() => {
            setSelectedTheater(null);
          }}
          closeOnClick={false}
        >
          <div>
            <h4>{selectedTheater.properties.name}</h4>
            <p>{selectedTheater.properties.address1}</p>
            <a href={selectedTheater.properties.url}>Website</a>
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
}

function msp(state) {
  return {
    activities: state.activities
  };
}

function mdp(dispatch) {
  return {
    setActivity: selectedTheater => {
      setActivity(dispatch, selectedTheater)();
    }
  };
}

export default connect(
  msp,
  mdp
)(TheaterMap);
