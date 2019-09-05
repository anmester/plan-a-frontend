import React from "react";
import "../App.css";
import { connect } from "react-redux";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Calendar from "../components/Calendar";

class PlansContainer extends React.Component {
  state = {
    plans: [],
    activities: [],
    planDetails: false
  };

  componentDidMount() {
    this.fetchPlans();
  }

  fetchPlans() {
    let userId = this.props.user.id;
    fetch("http://localhost:3000/plans")
      .then(res => res.json())
      .then(plans => {
        let targetPlans = plans.filter(plan => plan.user_id === userId);
        this.setState({ plans: targetPlans });
      });
  }

  fetchTargetActivities = (e, plan) => {
    e.preventDefault();
    let planID = plan.id;

    fetch(`http://localhost:3000/plans/${planID}/activities`)
      .then(res => res.json())
      .then(targetActivities => {
        this.setState({ activities: targetActivities });
      })
      .then(this.setState({ planDetails: true }));
  };

  closePlanDetails = e => {
    e.preventDefault();
    this.setState({ planDetails: false });
  };

  render() {
    let planNames = this.state.plans.map(plan => (
      <div className="card-block" key={plan.id}>
        {plan.name}
        <br></br>
        {/* Date: {plan.date.toString()} */}
        <br></br>
        <button onClick={e => this.fetchTargetActivities(e, plan)}>
          SEE PLAN DETAILS
        </button>
      </div>
    ));

    let planDetails = (
      <div className="card-block">
        <ul>
          {this.state.activities.map(activity => (
            <li key={activity.id}>{activity.name}</li>
          ))}
        </ul>
        <button onClick={this.closePlanDetails}>CLOSE PLAN DETAILS</button>
      </div>
    );

    console.log("plans in plan containers", this.state.activities);

    return (
      <>
        <h2 style={{ textAlign: "center" }}>
          {this.props.user.username}'s Plans
        </h2>
        <div class="button-toolbar" style={{ textAlign: "center" }}>
          <ToggleButtonGroup type="radio" name="plan-view" defaultValue={1}>
            <ToggleButton value={1}>List View</ToggleButton>
            <ToggleButton value={2}>Calendar View</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="card-group">
          {this.state.planDetails ? planDetails : planNames}
        </div>
        <Calendar />
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
)(PlansContainer);
