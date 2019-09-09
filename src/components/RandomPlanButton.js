import React from "react";
import "../App.css";
import RandomPlanModal from "./RandomPlanModal";

export default function RandomPlanButton(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <RandomPlanModal show={modalShow} onHide={() => setModalShow(false)} />
  );
}
