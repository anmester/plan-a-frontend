import { combineReducers } from "redux";

const defaultState = {
  user: {},
  restaurants: {},
  activities: [],
  theaters: {},
  galleries: {},
  outdoorEvents: {},
  bars: {},
  plan: {}
};

function userReducer(state = defaultState.user, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return action.payload;
    case "RETRIEVE_USER":
      return action.payload;
    case "SIGN_UP_USER":
      return action.payload;
    default:
      return state;
  }
}

function planReducer(state = defaultState.plan, action) {
  switch (action.type) {
    case "CREATE_PLAN":
      return action.payload;
    case "SUBMIT_PLAN":
      return action.payload;
    default:
      return state;
  }
}

function restaurantReducer(state = defaultState.restaurants, action) {
  switch (action.type) {
    case "FETCH_RESTAURANTS":
      return action.payload;
    default:
      return state;
  }
}

function barReducer(state = defaultState.bars, action) {
  switch (action.type) {
    case "FETCH_BARS":
      return action.payload;
    default:
      return state;
  }
}

function theatersReducer(state = defaultState.theaters, action) {
  switch (action.type) {
    case "FETCH_THEATERS":
      return action.payload;
    default:
      return state;
  }
}

function galleriesReducer(state = defaultState.galleries, action) {
  switch (action.type) {
    case "FETCH_GALLERIES":
      return action.payload;
    default:
      return state;
  }
}

function outdoorEventsReducer(state = defaultState.outdoorEvents, action) {
  switch (action.type) {
    case "FETCH_OUTDOOR_EVENTS":
      return action.payload;
    default:
      return state;
  }
}

function activityReducer(state = defaultState.activities, action) {
  switch (action.type) {
    case "SET_ACTIVITY":
      return [...state, action.payload];
    case "REMOVE_ACTIVITY":
      let updatedActivities = state.filter(
        activity => action.payload.id !== activity.id
      );
      return updatedActivities;
    case "GET_RANDOM_ACTIVITIES":
      return [...state, action.payload];
    case "RESET_ACTIVITIES":
      console.log("action payload", action.payload);
      action.payload = [];
      console.log("resetting actionpayload", action.payload);
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({
  user: userReducer,
  restaurants: restaurantReducer,
  activities: activityReducer,
  plan: planReducer,
  theaters: theatersReducer,
  galleries: galleriesReducer,
  outdoorEvents: outdoorEventsReducer,
  bars: barReducer
});

export default reducer;
