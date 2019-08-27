import React from "react";
import "../App.css";
import { signUp } from "../actions.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    allergies: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.props.signUp(
            this.state.username,
            this.state.password,
            this.state.allergies,
            this.props.history
          );
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={this.state.username}
          onChange={this.changeHandler}
        />
        <input
          type="text"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.changeHandler}
        />
        <input
          type="text"
          name="allergies"
          placeholder="Enter any allergies"
          value={this.state.allergies}
          onChange={this.changeHandler}
        />
        <button>Sign Up</button>
      </form>
    );
  }
}

function mdp(dispatch) {
  return {
    signUp: (username, password, allergies, history) => {
      signUp(dispatch, { username, password, allergies }, history)();
    }
  };
}

export default withRouter(
  connect(
    null,
    mdp
  )(SignUp)
);
