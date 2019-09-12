import React from "react";
import "../App.css";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Logo from "../planALogo.png";
import { Route, Link } from "react-router-dom";
import PlanCreateContainer from "../containers/PlanCreateContainer";
import PlansContainer from "../containers/PlansContainer";
import UserProfileContainer from "../containers/UserProfileContainer";

class HomeNav extends React.Component {
  logoutUser = () => {
    localStorage.removeItem("token");
    this.props.history.push("/plana");
  };

  render() {
    return (
      <Navbar variant="dark" sticky="top" className="navbar">
        <Navbar.Brand href="/welcome">
          <img
            alt=""
            src={Logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Brand className="nav-logo" href="/welcome">
          Plan A
        </Navbar.Brand>
        <Nav className="mr-auto navbar">
          <a className="nav-link">
            <Link to="/welcome">Home</Link>
          </a>
          <a className="nav-link">
            <Link to={`/${this.props.user.username}`}>Profile</Link>
          </a>
          <a className="nav-link">
            <Link to={`/${this.props.user.username}/plans`}>My Plans</Link>
          </a>
          {/* <Nav.Link href={`/${this.props.user.username}`}>Profile</Nav.Link>
          <Nav.Link href={`/${this.props.user.username}/plans`}>
            My Plans
          </Nav.Link> */}
        </Nav>
        <Form inline>
          <Button variant="outline-light" onClick={this.logoutUser}>
            Logout
          </Button>
        </Form>
        {/* <Route path="/welcome" render={() => PlanCreateContainer} />
        <Route
          path={`/${this.props.user.username}`}
          render={() => UserProfileContainer}
        />
        <Route
          path={`/${this.props.user.username}/plans`}
          render={() => PlansContainer}
        /> */}
      </Navbar>
    );
  }
}

function msp(state) {
  return {
    user: state.user
  };
}

export default connect(
  msp,
  null
)(HomeNav);
