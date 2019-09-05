import React, { useState } from "react";
import "../App.css";
import { Marker, Popup } from "react-map-gl";
import * as Gallery from "../data/nycArtGalleries.json";
import { connect } from "react-redux";
import { setActivity } from "../actions.js";

function GalleryMap(props) {
  const [selectedGallery, setSelectedGallery] = useState(null);

  return (
    <>
      {Gallery.features.map(gallery => (
        <Marker
          key={gallery.properties.name}
          latitude={gallery.geometry.coordinates[1]}
          longitude={gallery.geometry.coordinates[0]}
        >
          <button
            className="btn btn small"
            onClick={e => {
              e.preventDefault();
              setSelectedGallery(gallery);
            }}
          >
            <i className="fa fa-paint-brush"></i>
          </button>
        </Marker>
      ))}

      {selectedGallery ? (
        <Popup
          latitude={selectedGallery.geometry.coordinates[1]}
          longitude={selectedGallery.geometry.coordinates[0]}
          onClose={() => {
            setSelectedGallery(null);
          }}
          closeOnClick={false}
        >
          <div>
            <h4>{selectedGallery.properties.name}</h4>
            <p>{selectedGallery.properties.address1}</p>
            <a href={selectedGallery.properties.url}>Website</a>
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
}

function msp(state) {
  return {
    activities: state.activities
  };
}

function mdp(dispatch) {
  return {
    setActivity: selectedGallery => {
      setActivity(dispatch, selectedGallery)();
    }
  };
}

export default connect(
  msp,
  mdp
)(GalleryMap);
