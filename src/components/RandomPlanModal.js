import React, { useState, useEffect } from "react";
import "../App.css";
import { Button, Modal, ButtonToolbar, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { finalizePlan, getRandomPlan } from "../actions";

function RandomPlanModal(props) {
  const [show, setShow] = useState(false);

  const [activities, setActivities] = useState();
  const [planName, setPlanName] = useState();
  const [planDate, setPlanDate] = useState();

  const [finalized, setFinalized] = useState(false);

  const handleClose = e => {
    setShow(false);
  };

  const planNameHandler = e => setPlanName(e.target.value);

  const planDateHandler = e => setPlanDate(e.target.value);

  const handleFinalize = () => setFinalized(true);

  const handleShow = () => {
    fetch("http://localhost:3000/random-plan")
      .then(res => res.json())
      .then(randomActivities => {
        console.log("random activities", randomActivities);
        setActivities(randomActivities);
      })
      .then(setShow(true));
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log("planName", planName, "planDate", planDate);
    let currentDate = new Date();
    let validatePlanDate = new Date(planDate);

    if (validatePlanDate < currentDate) {
      alert("Please choose a valid date");
      setFinalized(true);
    } else {
      props.finalizePlan(props.user, { planName, planDate }, activities);
      handleClose();
    }
  };

  return (
    <>
      <button className="card-block fixed-height-card" onClick={handleShow}>
        <h2 className="select-plan">Random Plan</h2>
        <p className="select-plan subheader">CLICK TO GET STARTED</p>
      </button>

      {!finalized ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.user.username}'s Random Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {activities ? (
              activities.map(activity => (
                <li>
                  <strong>{activity.name}</strong>: {activity.category}
                </li>
              ))
            ) : (
              <h1>Generating your plan...</h1>
            )}
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                className="button"
                name="re-randomize"
                onClick={handleShow}
              >
                RE-RANDOMIZE
              </Button>{" "}
              &nbsp;
              <Button
                name="finalize-plan"
                className="button"
                onClick={handleFinalize}
              >
                FINALIZE PLAN
              </Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.user.username}'s Random Plan</Modal.Title>
          </Modal.Header>
          <Form onSubmit={submitHandler}>
            <Modal.Body>
              <Form.Group controlId="planName">
                <Form.Control
                  required
                  type="text"
                  name="planName"
                  placeholder="Enter Plan Name"
                  value={planName}
                  onChange={planNameHandler}
                />
              </Form.Group>
              <Form.Group controlId="datepicker">
                <Form.Control
                  required
                  type="date"
                  name="planDate"
                  placeholder="Select date"
                  value={planDate}
                  onChange={planDateHandler}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <ButtonToolbar>
                <Button
                  name="finalize-plan"
                  variant="primary"
                  type="submit"
                  // onClick={handleClose}
                >
                  FINALIZE PLAN
                </Button>
              </ButtonToolbar>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  );
}

function msp(state) {
  return {
    user: state.user,
    activities: state.activities
  };
}

function mdp(dispatch) {
  return {
    finalizePlan: (user, plan, activities) => {
      finalizePlan(dispatch, user, plan, activities)();
    },
    getRandomPlan: () => {
      getRandomPlan(dispatch)();
    }
  };
}

export default connect(
  msp,
  mdp
)(RandomPlanModal);
