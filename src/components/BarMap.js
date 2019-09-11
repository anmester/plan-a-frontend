import React, { useState, useEffect } from "react";
import "../App.css";
import { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import { fetchBars, setActivity } from "../actions.js";
import LoadingLayer from "./LoadingLayer";

function BarMap(props) {
  const [selectedBar, setSelectedBar] = useState(null);

  useEffect(() => {
    props.fetchBars();
  });

  if (props.bars[0]) {
    return (
      <>
        {props.bars.map(bar => (
          <Marker
            key={bar.id}
            latitude={Number(bar.latitude)}
            longitude={Number(bar.longitude)}
            offsetLeft={-15}
            offsetTop={-14}
          >
            <button
              className="btn btn small"
              onClick={e => {
                e.preventDefault();
                setSelectedBar(bar);
              }}
            >
              <i className="fas fa-map-marker-alt" alt="map-marker"></i>
            </button>
          </Marker>
        ))}

        {selectedBar ? (
          <Popup
            latitude={Number(selectedBar.latitude)}
            longitude={Number(selectedBar.longitude)}
            onClose={() => {
              setSelectedBar(null);
            }}
            closeOnClick={false}
            className="correctFont"
          >
            <div>
              <h4>{selectedBar.name}</h4>
              <p>{selectedBar.description}</p>
              <p>{selectedBar.link}</p>
              <br></br>
              <button
                onClick={() => {
                  props.setActivity(selectedBar);
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
    bars: state.bars,
    activities: state.activities
  };
}

function mdp(dispatch) {
  return {
    fetchBars: () => {
      fetchBars(dispatch)();
    },

    setActivity: selectedBar => {
      setActivity(dispatch, selectedBar)();
    }
  };
}

export default connect(
  msp,
  mdp
)(BarMap);
