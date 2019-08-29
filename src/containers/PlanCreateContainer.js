import React from "react";
import "../App.css";
import ChoosePlan from "../components/ChoosePlan";
import PlanStep1 from "../components/PlanStep1";
import PlanStep2 from "../components/PlanStep2";
import PlanStep3 from "../components/PlanStep3";
import FinalizePlan from "../components/FinalizePlan";

export default class PlanCreateContainer extends React.Component {
  render() {
    return (
      <>
        <ChoosePlan clickHandler={this.clickHandler} />
        <PlanStep1 />
        <PlanStep2 />
        <PlanStep3 />
        <FinalizePlan />
      </>
    );
  }
}
