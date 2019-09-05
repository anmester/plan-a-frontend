import React from "react";
import "../App.css";
import { connect } from "react-redux";
import { finalizePlan } from "../actions";

class FinalizePlan extends React.Component {
  render() {
    return (
      <div className="stop-container">
        <div className="row">
          <div className="card-deck">
            <button
              className="card-block"
              name="finalize-plan"
              onClick={e => {
                e.preventDefault();
                this.props.finalizePlan(
                  this.props.user,
                  this.props.plan,
                  this.props.activities
                );
                this.props.planInProgress();
              }}
            >
              FINALIZE PLAN
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function msp(state) {
  return {
    user: state.user,
    plan: state.plan,
    activities: state.activities
  };
}

function mdp(dispatch) {
  console.log("inside dispatch in finalizeplan");
  return {
    finalizePlan: (user, plan, activities) => {
      finalizePlan(dispatch, user, plan, activities)();
    }
  };
}

export default connect(
  msp,
  mdp
)(FinalizePlan);
