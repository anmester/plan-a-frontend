import React from "react";
import "../App.css";
import { connect } from "react-redux";
import { loginUser } from "../actions";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="card-deck">
            <div className="login-card" style={{ width: 18 + "em" }}>
              <div className="card-body">
                <h4>Log In to Plan A</h4>
                <br></br>
                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    this.props.loginSubmit(
                      this.state.username,
                      this.state.password,
                      this.props.history
                    );
                  }}
                >
                  <Form.Group controlId="loginUsername">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={this.state.username}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId="loginPassword">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Button variant="dark" size="md" type="submit">
                    Login
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
    loginSubmit: (username, password, history) => {
      loginUser(dispatch, { username, password }, history)();
    }
  };
}

export default withRouter(
  connect(
    null,
    mdp
  )(Login)
);
