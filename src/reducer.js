import { combineReducers } from "redux";

const defaultState = {
  user: {},
  restaurants: {},
  activities: [],
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
  console.log("inside plan reducer - submit", action.payload);
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

function activityReducer(state = defaultState.activities, action) {
  switch (action.type) {
    case "SET_ACTIVITY":
      return [...state, action.payload];
    default:
      return state;
  }
}

const reducer = combineReducers({
  user: userReducer,
  restaurants: restaurantReducer,
  activities: activityReducer,
  plan: planReducer
});

export default reducer;
