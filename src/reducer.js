import { combineReducers } from "redux";

const defaultState = {
  user: {}
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

const reducer = combineReducers({
  user: userReducer
});

export default reducer;
