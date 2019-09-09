import React from "react";
import "../App.css";
import PlanDetailsModal from "./PlanDetailsModal";

export default function PlanDetailsButton(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <PlanDetailsModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      fetchTargetActivities={props.fetchTargetActivities}
      plan={props.plan}
      activities={props.activities}
    />
  );
}
