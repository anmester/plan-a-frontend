import React from "react";
import "../App.css";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

class HomeNav extends React.Component {
  logoutUser = () => {
    localStorage.removeItem("token");
    this.props.history.push("/plana");
  };

  render() {
    return (
      <Navbar variant="dark" sticky="top" className="navbar">
        <Navbar.Brand href="/welcome">Plan A</Navbar.Brand>
        <Nav className="mr-auto navbar">
          <Nav.Link href="/welcome">Home</Nav.Link>
          <Nav.Link href={`/${this.props.user.username}`}>Profile</Nav.Link>
          <Nav.Link href={`/${this.props.user.username}/plans`}>
            My Plans
          </Nav.Link>
        </Nav>
        <Form inline>
          <Button variant="outline-light" onClick={this.logoutUser}>
            Logout
          </Button>
        </Form>
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
