import React, { useState } from "react";
import "../App.css";
import { Button, Modal } from "react-bootstrap";

export default function PlanDetailsModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Show Plan Details
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        onClick={e => props.fetchTargetActivities(e, props.plan)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.plan.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {props.activities.map(activity => (
              <li key={activity.id}>{activity.name}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close Plan Details
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
