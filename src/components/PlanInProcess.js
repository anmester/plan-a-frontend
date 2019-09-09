import React from "react";
import "../App.css";
import { connect } from "react-redux";
import { removeActivity } from "../actions";

class PlanInProcess extends React.Component {
  render() {
    return (
      <div className="stop-container">
        <div className="row">
          <div className="card-deck">
            <div className="card-block">
              <p>{this.props.plan.planName}</p>
              <ul>
                {this.props.activities.map(activity => (
                  <li>
                    {console.log(activity, "activity")}
                    {activity.properties.name} &nbsp;
                    <button
                      onClick={e => {
                        e.preventDefault();
                        this.props.removeActivity(activity);
                      }}
                    >
                      x
                    </button>
                  </li>
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
