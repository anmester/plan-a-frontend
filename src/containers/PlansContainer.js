import React from "react";
import "../App.css";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PlanDetailsButton from "../components/PlanDetailsButton";

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

  editPlan() {
    console.log("inside edit plan");
  }

  deletePlan = (e, plan) => {
    e.preventDefault();
    let planID = plan.id;

    fetch(`http://localhost:3000/plans/${planID}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let filteredPlans = this.state.plans.filter(
          planData => planData.id !== plan.id
        );
        this.setState({ plans: filteredPlans });
      });
  };

  render() {
    let planNames = this.state.plans.map(plan => (
      <div className="card-block" id="form" key={plan.id}>
        {plan.name}
        <br></br>
        <br></br>
        <PlanDetailsButton
          plan={plan}
          activities={this.state.activities}
          fetchTargetActivities={this.fetchTargetActivities}
        />
        <br></br>
        <br></br>
        <Button
          className="button"
          onClick={e => this.deletePlan(e, plan)}
          id="form"
        >
          Delete Plan
        </Button>
      </div>
    ));

    let nameStyler = {
      marginLeft: 87 + "vh",
      color: "white"
    };

    return (
      <div className="plans-container" id="form">
        <br></br>
        <h2 style={nameStyler}>{this.props.user.username}'s Plans</h2>
        <br></br>
        <br></br>
        <div className="card-group" style={{ marginLeft: 18 + "vh" }}>
          {planNames}
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
)(PlansContainer);
