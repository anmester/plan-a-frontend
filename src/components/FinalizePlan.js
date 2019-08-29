import React from "react";
import "../App.css";

export default class FinalizePlan extends React.Component {
  render() {
    return (
      <div className="stop-container">
        <div className="row">
          <div className="card-deck">
            <button
              onClick={this.clickHandler}
              className="card-block"
              name="finalize-plan"
            >
              FINALIZE PLAN
            </button>
          </div>
        </div>
      </div>
    );
  }
}
