import React from "react";
import "../App.css";
import ChoosePlan from "../components/ChoosePlan";
import CreatePlanProcessContainer from "./CreatePlanProcessContainer";
import { connect } from "react-redux";

class PlanCreateContainer extends React.Component {
  state = {
    planInProgress: false
  };

  planInProgress = e => {
    console.log("hello is this on");
    this.setState({ planInProgress: !this.state.planInProgress });
  };

  render() {
    return (
      <div id="form">
        {this.state.planInProgress ? (
          <CreatePlanProcessContainer planInProgress={this.planInProgress} />
        ) : (
          <ChoosePlan planInProgress={this.planInProgress} />
        )}
      </div>
    );
  }
}

function msp(state) {
  return {
    activities: state.activites
  };
}

export default connect(
  msp,
  null
)(PlanCreateContainer);
