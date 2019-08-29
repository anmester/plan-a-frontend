import React from "react";
import "../App.css";
import { Link, Events, animateScroll as scroll, scrollSpy } from "react-scroll";

export default class PlanStep2 extends React.Component {
  state = {
    stopNumber: 1
  };

  componentDidMount() {
    Events.scrollEvent.register("begin");
    Events.scrollEvent.register("end");
    scrollSpy.update();
  }

  clickHandler = e => {
    if (this.state.stopNumber < 3) {
      this.setState({ stopNumber: (this.state.stopNumber += 1) });
    } else {
      this.setState({ stopNumber: 0 });
    }
  };

  render() {
    return (
      <div className="stop-container">
        <div className="row">
          <div className="card-deck">
            <Link
              activeClass="active"
              to="finalize-plan"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <button
                onClick={this.clickHandler}
                className="card-block"
                name="stop-3"
              >
                CHOOSE STOP 3
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
