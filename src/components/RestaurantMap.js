import React, { useState, useEffect } from "react";
import "../App.css";
import { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import { fetchRestaurants } from "../actions.js";

function RestaurantMap(props) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    props.fetchRestaurants();
  });

  if (props.restaurants.restaurants) {
    return (
      <>
        {props.restaurants.restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            latitude={restaurant.lat}
            longitude={restaurant.lng}
          >
            <button
              className="btn btn small"
              onClick={e => {
                e.preventDefault();
                setSelectedRestaurant(restaurant);
              }}
            >
              <i>🍴</i>
            </button>
          </Marker>
        ))}

        {selectedRestaurant ? (
          <Popup
            latitude={selectedRestaurant.lat}
            longitude={selectedRestaurant.lng}
            onClose={() => {
              setSelectedRestaurant(null);
            }}
          >
            <div>
              <h4>{selectedRestaurant.name}</h4>
              <img src={selectedRestaurant.image_url} />
              <p>{selectedRestaurant.address}</p>
              <p>{selectedRestaurant.price}</p>
              <br></br>
              <button>Make Stop</button>
            </div>
          </Popup>
        ) : null}
      </>
    );
  } else {
    return <h1>hi</h1>;
  }
}

function msp(state) {
  return {
    restaurants: state.restaurants
  };
}

function mdp(dispatch) {
  return {
    fetchRestaurants: () => {
      fetchRestaurants(dispatch)();
    }
  };
}

export default connect(
  msp,
  mdp
)(RestaurantMap);
