import React from "react";
import "../App.css";
import { signUp } from "../actions.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";

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

  // add in logic that validates that user has filled out username and password prior to being able to submit form to sign in
  // change password when typing to just dots

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="card-deck">
            <div className="login-card" style={{ width: 18 + "em" }}>
              <div className="card-body">
                <h4>Sign Up for Plan A</h4>
                <br></br>
                <Form
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
                  <Form.Group controlId="signupUsername">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId="signupPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId="signupAllergies">
                    <Form.Control
                      type="text"
                      name="allergies"
                      placeholder="Enter any allergies"
                      value={this.state.allergies}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Button variant="dark" size="md" type="submit">
                    Sign Up
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
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
