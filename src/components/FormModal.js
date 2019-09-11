import React, { useState, useEffect } from "react";
import "../App.css";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";
import { connect } from "react-redux";
import { finalizePlan, getRandomPlan } from "../actions";

function FormModal(props) {
  const [show, setShow] = useState(false);

  const [activities, setActivities] = useState();

  const [finalized, setFinalized] = useState(false);

  const handleClose = () => setShow(false);

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

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} id="form">
        <Modal.Header closeButton>
          <Modal.Title>{props.user.username}'s Random Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>hello i hope this works</Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button
              name="finalize-plan"
              variant="primary"
              onClick={handleClose}
            >
              FINALIZE PLAN
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
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
    finalizePlan: () => {
      finalizePlan(dispatch)();
    },
    getRandomPlan: () => {
      getRandomPlan(dispatch)();
    }
  };
}

export default connect(
  msp,
  mdp
)(FormModal);
