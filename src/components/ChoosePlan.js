import React from "react";
import "../App.css";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { createPlan, resetActivities } from "../actions";
import RandomPlanButton from "./RandomPlanButton";

class ChoosePlan extends React.Component {
  state = {
    planInProcess: true,
    planName: "",
    planDate: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.setState({ planInProcess: true });
  }

  clickHandler = e => {
    e.preventDefault();
    this.setState({ planInProcess: !this.state.planInProcess });
    this.props.resetActivities(this.props.activities);
  };

  submitHandler = e => {
    e.preventDefault();
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    let validatePlanDate = new Date(this.state.planDate);

    if (validatePlanDate < currentDate) {
      alert("Please choose a valid date");
      this.setState({ planInProcess: false });
    } else {
      this.props.createPlan(this.state.planName, this.state.planDate);
      this.setState({ planInProcess: true });
      this.props.planInProgress();
    }
  };

  render() {
    return (
      <div className="container-fluid choose-plan">
        <div className="row plan-select">
          <div>
            {this.state.planInProcess ? (
              <div className="create-align">
                <button
                  onClick={this.clickHandler}
                  className="card-block fixed-height-card"
                  name="create-plan"
                >
                  <h2 className="select-plan">Create a Plan</h2>
                  <p className="select-plan subheader">CLICK TO GET STARTED</p>
                </button>
              </div>
            ) : (
              <div className="create-align">
                <Form
                  className="card-block fixed-height-card"
                  id="form"
                  onSubmit={this.submitHandler}
                >
                  <Form.Group controlId="planName">
                    <Form.Control
                      required
                      type="text"
                      name="planName"
                      placeholder="Enter Plan Name"
                      value={this.state.planName}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group controlId="datepicker">
                    <Form.Control
                      required
                      type="date"
                      name="planDate"
                      placeholder="Select date"
                      value={this.state.planDate}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Button
                    className="button"
                    size="md"
                    type="submit"
                    name="create-plan"
                  >
                    START PLANNING
                  </Button>
                </Form>
              </div>
            )}
            <div className="random-align">
              <RandomPlanButton className="card-block" name="random-plan" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function msp(state) {
  return {
    activities: state.activities
  };
}

function mdp(dispatch) {
  return {
    createPlan: (planName, planDate) => {
      createPlan(dispatch, { planName, planDate })();
    },
    resetActivities: activities => {
      resetActivities(dispatch, activities)();
    }
  };
}

export default connect(
  msp,
  mdp
)(ChoosePlan);
