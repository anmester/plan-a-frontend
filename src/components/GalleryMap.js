import React, { useState } from "react";
import "../App.css";
import { Marker, Popup } from "react-map-gl";
import * as Gallery from "../data/nycArtGalleries.json";

export default function GalleryMap() {
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
        >
          <div>
            <h4>{selectedGallery.properties.name}</h4>
            <p>{selectedGallery.properties.address1}</p>
            <a href={selectedGallery.properties.url}>Website</a>
            <br></br>
            <button>Make Stop</button>
          </div>
        </Popup>
      ) : null}
    </>
  );
}
