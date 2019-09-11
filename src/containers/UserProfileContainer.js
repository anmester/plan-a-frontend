import React from "react";
import "../App.css";
import { connect } from "react-redux";

class UserProfileContainer extends React.Component {
  render() {
    return (
      <div className="user-profile-container">
        <div className="profile-card">
          <div className="card-block user-profile" id="form">
            <h2>
              <strong>Username:</strong> {this.props.user.username}
            </h2>
            <p>
              <strong>Allergies:</strong> {this.props.user.allergies}
            </p>
            <a
              href={`/${this.props.user.username}/plans`}
              style={{ color: "#ff7948" }}
            >
              View Your Plans
            </a>
          </div>
        </div>
      </div>
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
