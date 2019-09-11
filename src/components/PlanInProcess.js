import React from "react";
import "../App.css";
import { connect } from "react-redux";
import { removeActivity } from "../actions";

class PlanInProcess extends React.Component {
  render() {
    let targetActivities = this.props.activities.map(activity => (
      <li className="target-activities" id="form">
        {console.log(activity, "activity")}
        {activity.name} &nbsp;
        <button
          onClick={e => {
            e.preventDefault();
            this.props.removeActivity(activity);
          }}
        >
          x
        </button>
      </li>
    ));

    return (
      <div className="stop-container">
        <div className="row">
          <div className="card-deck">
            <div className="card-block" id="form">
              <p>
                <strong>{this.props.plan.planName}</strong>
              </p>
              <ul>{targetActivities}</ul>
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

function mdp(dispatch) {
  return {
    removeActivity: activity => {
      removeActivity(dispatch, activity)();
    }
  };
}

export default connect(
  msp,
  mdp
)(PlanInProcess);
