import React from "react";
import "../App.css";
import { Link, Events, animateScroll as scroll, scrollSpy } from "react-scroll";

export default class ChoosePlan extends React.Component {
  componentDidMount() {
    Events.scrollEvent.register("begin");
    Events.scrollEvent.register("end");
    scrollSpy.update();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="card-deck">
            <Link
              activeClass="active"
              to="stop-1"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <button
                onClick={this.props.clickHandler}
                className="card-block"
                name="create-plan"
              >
                CREATE A PLAN
              </button>
            </Link>
            <Link
              activeClass="active"
              to="test"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              <button
                onClick={this.props.clickHandler}
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
