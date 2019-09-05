import React from "react";
import "../App.css";
import { Link, Events, animateScroll as scroll, scrollSpy } from "react-scroll";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { createPlan } from "../actions";

class ChoosePlan extends React.Component {
  state = {
    planInProcess: true,
    planName: "",
    planDate: ""
  };

  changeHandler = e => {
    console.log("name:", e.target.name, "value:", e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    Events.scrollEvent.register("begin");
    Events.scrollEvent.register("end");
    scrollSpy.update();
    this.setState({ planInProcess: true });
  }

  clickHandler = e => {
    // console.log(e.target.name);
    e.preventDefault();
    this.setState({ planInProcess: !this.state.planInProcess });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="card-deck">
            {this.state.planInProcess ? (
              <button
                onClick={this.clickHandler}
                className="card-block"
                name="create-plan"
              >
                CREATE A PLAN
              </button>
            ) : (
              <Form
                className="card-block"
                onSubmit={e => {
                  e.preventDefault();
                  this.props.createPlan(
                    this.state.planName,
                    this.state.planDate
                  );
                  this.setState({ planInProcess: true });
                  this.props.planInProgress();
                }}
              >
                <Form.Group controlId="planName">
                  <Form.Control
                    type="text"
                    name="planName"
                    placeholder="Enter Plan Name"
                    value={this.state.planName}
                    onChange={this.changeHandler}
                  />
                </Form.Group>
                <Form.Group controlId="planDate">
                  <Form.Control
                    type="date"
                    name="planDate"
                    placeholder="Select date"
                    value={this.state.planDate}
                    onChange={this.changeHandler}
                  />
                </Form.Group>
                <Button
                  variant="dark"
                  size="md"
                  type="submit"
                  name="create-plan"
                >
                  START PLANNING
                </Button>
              </Form>
            )}
            <Link
              activeClass="active"
              to="test"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <button
                onClick={this.clickHandler}
                className="card-block"
                name="random-plan"
              >
                RANDOM PLAN
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mdp(dispatch) {
  return {
    createPlan: (planName, planDate) => {
      createPlan(dispatch, { planName, planDate })();
    }
  };
}

export default connect(
  null,
  mdp
)(ChoosePlan);
