import React from "react";
import "../App.css";
import { connect } from "react-redux";

class PlanInProcess extends React.Component {
  render() {
    console.log(this.props.plan);
    return (
      <div className="stop-container">
        <div className="row">
          <div className="card-deck">
            <div className="card-block">
              <p>{this.props.plan.planName}</p>
              <ul>
                {this.props.activities.map(activity => (
                  <li>{activity.properties.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function msp(state) {
  return {
    activities: state.activities,
    plan: state.plan
  };
}

export default connect(
  msp,
  null
)(PlanInProcess);
