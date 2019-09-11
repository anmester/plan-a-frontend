import React from "react";
import "../App.css";
import { Link, Events, animateScroll as scroll, scrollSpy } from "react-scroll";

export default class PlanStepChoice extends React.Component {
  state = {
    stopNumber: 1
  };

  componentDidMount() {
    Events.scrollEvent.register("begin");
    Events.scrollEvent.register("end");
    scrollSpy.update();
  }

  render() {
    let dropdownWidth = {
      width: 10 + "em"
    };

    let dropdownAlign = {
      display: "inline"
    };

    let categories = this.props.activityCategories.map(category => (
      <option value={category} key={category}>
        {category}
      </option>
    ));

    return (
      <div className="stop-container">
        <div className="row">
          <div className="card-deck">
            <div className="card-block" id="form">
              <div className="form">
                <div className="form-group">
                  <label>Choose Activity Category</label>
                  <select
                    className="form-control"
                    id="category-select"
                    style={{ ...dropdownWidth, ...dropdownAlign }}
                    onChange={e => {
                      e.preventDefault();
                      this.props.handleCategoryChange(e);
                    }}
                  >
                    {categories}
                  </select>
                </div>
              </div>
              <Link
                activeClass="active"
                to="finalize-plan"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                <button
                  name="view-map"
                  onClick={this.props.showStopMap}
                  id="form"
                  className="button"
                >
                  VIEW YOUR MAP
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
