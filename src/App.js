import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomeNav from "./components/HomeNav";
import Homepage from "./containers/Homepage";
import PlanCreateContainer from "./containers/PlanCreateContainer";
import PlansContainer from "./containers/PlansContainer";
import ReviewsContainer from "./containers/ReviewsContainer";
import UserProfileContainer from "./containers/UserProfileContainer";
import { retrieveUser } from "./actions";

class App extends React.Component {
  // change key 'token' to be unique to this site: 'plan-a-token'
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      this.props.retrieveUser(token, this.props.history, this.props.location);
    } else {
      this.props.history.push("/plana");
    }
  }

  render() {
    return (
      <Switch>
        <Route
          path="/welcome"
          render={() => (
            <>
              <HomeNav history={this.props.history} />
              <PlanCreateContainer />
            </>
          )}
        />

        <Route path="/login" render={() => <Login />} />

        <Route path="/plana" component={Homepage} />

        <Route path="/signup" render={() => <SignUp />} />

        <Route
          exact
          path={`/${this.props.user.username}`}
          render={() => (
            <>
              <HomeNav history={this.props.history} />
              <UserProfileContainer />
            </>
          )}
        />

        <Route
          path={`/${this.props.user.username}/reviews`}
          render={() => (
            <>
              <HomeNav history={this.props.history} />
              <ReviewsContainer />
            </>
          )}
        />

        <Route
          path={`/${this.props.user.username}/plans`}
          render={() => (
            <>
              <HomeNav history={this.props.history} />
              <PlansContainer />
            </>
          )}
        />
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
    retrieveUser: (token, history, location) => {
      retrieveUser(dispatch, token, history, location)();
    }
  };
}

export default withRouter(
  connect(
    msp,
    mdp
  )(App)
);
