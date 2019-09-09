import React from "react";
import "../App.css";
import ChoosePlan from "../components/ChoosePlan";
import CreatePlanProcessContainer from "./CreatePlanProcessContainer";

export default class PlanCreateContainer extends React.Component {
  state = {
    planInProgress: false
  };

  planInProgress = e => {
    console.log("plan in progress");
    this.setState({ planInProgress: !this.state.planInProgress });
  };

  render() {
    return (
      <>
        {this.state.planInProgress ? (
          <CreatePlanProcessContainer planInProgress={this.planInProgress} />
        ) : (
          <ChoosePlan planInProgress={this.planInProgress} />
        )}
      </>
    );
  }
}
