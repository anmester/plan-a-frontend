import React, { useState } from "react";
import "../App.css";
import { Button, Modal } from "react-bootstrap";

export default function PlanDetailsModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="button" onClick={handleShow} id="form">
        Show Plan Details
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        onClick={e => props.fetchTargetActivities(e, props.plan)}
        className="correctFont"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.plan.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Date:</strong> {props.plan.date.slice(0, 10)}
          </p>
          <p>
            <strong>Your Activities:</strong>
          </p>
          <ul>
            {props.activities.map(activity => (
              <li key={activity.id}>{activity.name}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Edit Plan
          </Button> */}
          <Button className="button" onClick={handleClose}>
            Close Plan Details
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
