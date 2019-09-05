import React from "react";
import "../App.css";
import { connect } from "react-redux";

class UserProfileContainer extends React.Component {
  render() {
    return (
      <>
        <h2>Name: {this.props.user.username}</h2>
        <p>Allergies: {this.props.user.allergies}</p>
      </>
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
)(UserProfileContainer);
