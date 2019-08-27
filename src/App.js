import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PlanCreateContainer from "./containers/PlanCreateContainer";
import { retrieveUser } from "./actions";

class App extends React.Component {
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.props.retrieveUser(token, this.props.history);
    } else {
      // change this to page that has welcome and signup
      this.props.history.push("/signup");
    }
  }

  render() {
    console.log("state of user", this.props.user);
    return (
      <Switch>
        <Route path="/welcome" component={PlanCreateContainer} />

        <Route path="/login" render={() => <Login />} />

        <Route path="/signup" render={() => <SignUp />} />
      </Switch>
    );
  }
}

function msp(state) {
  return {
    user: state.user
  };
}

function mdp(dispatch) {
  return {
    retrieveUser: (token, history) => {
      retrieveUser(dispatch, token, history)();
    }
  };
}

export default withRouter(
  connect(
    msp,
    mdp
  )(App)
);
