import React from "react";
import "../App.css";
import ChoosePlan from "../components/ChoosePlan";
import CreatePlanProcessContainer from "./CreatePlanProcessContainer";

export default class PlanCreateContainer extends React.Component {
  render() {
    return (
      <>
        <ChoosePlan clickHandler={this.clickHandler} />
        <CreatePlanProcessContainer />
      </>
    );
  }
}
