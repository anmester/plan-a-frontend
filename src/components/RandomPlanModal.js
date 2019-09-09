import React, { useState } from "react";
import "../App.css";
import { Button, Modal } from "react-bootstrap";

export default function PlanDetailsModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="card-block" onClick={handleShow}>
        RANDOM PLAN
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>this is working</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>modal body</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            FINALIZE PLAN
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
