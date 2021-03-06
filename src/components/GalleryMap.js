import React, { useState, useEffect } from "react";
import "../App.css";
import { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import { setActivity, fetchGalleries } from "../actions.js";
import LoadingLayer from "./LoadingLayer";

function GalleryMap(props) {
  const [selectedGallery, setSelectedGallery] = useState(null);

  useEffect(() => {
    props.fetchGalleries();
  });

  if (props.galleries[0]) {
    return (
      <>
        {props.galleries.map(gallery => (
          <Marker
            key={gallery.id}
            latitude={Number(gallery.latitude)}
            longitude={Number(gallery.longitude)}
            offsetLeft={-15}
            offsetTop={-14}
          >
            <button
              className="btn btn small"
              onClick={e => {
                e.preventDefault();
                setSelectedGallery(gallery);
              }}
            >
              <i className="fas fa-map-marker-alt" alt="map-marker"></i>
            </button>
          </Marker>
        ))}

        {selectedGallery ? (
          <Popup
            latitude={Number(selectedGallery.latitude)}
            longitude={Number(selectedGallery.longitude)}
            onClose={() => {
              setSelectedGallery(null);
            }}
            closeOnClick={false}
            className="correctFont"
          >
            <div>
              <h4>{selectedGallery.name}</h4>
              <br></br>
              <button
                onClick={() => {
                  props.setActivity(selectedGallery);
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
    galleries: state.galleries
  };
}

function mdp(dispatch) {
  return {
    setActivity: selectedGallery => {
      setActivity(dispatch, selectedGallery)();
    },
    fetchGalleries: () => {
      fetchGalleries(dispatch)();
    }
  };
}

export default connect(
  msp,
  mdp
)(GalleryMap);
