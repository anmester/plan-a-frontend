import React, { useState, useEffect } from "react";
import "../App.css";
import { Marker, Popup } from "react-map-gl";
import { connect } from "react-redux";
import { fetchRestaurants, setActivity } from "../actions.js";
import LoadingLayer from "./LoadingLayer";

function RestaurantMap(props) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    props.fetchRestaurants();
  });

  if (props.restaurants[0]) {
    return (
      <>
        {props.restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            latitude={Number(restaurant.latitude)}
            longitude={Number(restaurant.longitude)}
            offsetLeft={-15}
            offsetTop={-14}
          >
            <button
              className="btn btn small"
              onClick={e => {
                e.preventDefault();
                setSelectedRestaurant(restaurant);
              }}
            >
              <i className="fas fa-map-marker-alt" alt="map-marker"></i>
            </button>
          </Marker>
        ))}

        {selectedRestaurant ? (
          <Popup
            latitude={Number(selectedRestaurant.latitude)}
            longitude={Number(selectedRestaurant.longitude)}
            onClose={() => {
              setSelectedRestaurant(null);
            }}
            closeOnClick={false}
            id="form"
          >
            <div>
              <h4>{selectedRestaurant.name}</h4>
              <p>{selectedRestaurant.description}</p>
              <p>{selectedRestaurant.link}</p>
              <br></br>
              <button
                onClick={() => {
                  props.setActivity(selectedRestaurant);
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
    restaurants: state.restaurants,
    activities: state.activities
  };
}

function mdp(dispatch) {
  return {
    fetchRestaurants: () => {
      fetchRestaurants(dispatch)();
    },

    setActivity: selectedRestaurant => {
      setActivity(dispatch, selectedRestaurant)();
    }
  };
}

export default connect(
  msp,
  mdp
)(RestaurantMap);
