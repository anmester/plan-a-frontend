import React from "react";
import "../App.css";
import $ from "jquery";
import { Link } from "react-router-dom";

export default class Homepage extends React.Component {
  componentDidMount() {
    // set and render slotmachine text on pageload
    let wordbox = $("#wordbox .slottt-machine-recipe__items_container");

    var wordlist = [
      "night out",
      "birthday",
      "team outing",
      "surprise",
      "girls trip",
      "reunion",
      "happy hour",
      "date night",
      "big event",
      "nice day",
      "great date",
      "sunday"
    ];

    function buildSlotItem(text) {
      return $("<div>")
        .addClass("slottt-machine-recipe__item")
        .text(text);
    }

    function buildSlotContents($container, wordlist) {
      let items = wordlist.map(buildSlotItem);
      $container.append(items);
    }

    function popPushNItems($container, n) {
      let children = $container.find(".slottt-machine-recipe__item");
      children.slice(0, n).insertAfter(children.last());

      if (n === children.length) {
        popPushNItems($container, 1);
      }
    }

    function rotateContents($container, n) {
      setTimeout(function() {
        popPushNItems($container, n);
        $container.css({ top: 0 });
      }, 300);
    }

    function randomSlotttIndex(max) {
      var randIndex = (Math.random() * max) | 0;
      return randIndex > 10 ? randIndex : randomSlotttIndex(max);
    }

    function animate() {
      var wordIndex = randomSlotttIndex(wordlist.length);
      wordbox.animate({ top: -wordIndex * 150 }, 500, "swing", function() {
        rotateContents(wordbox, wordIndex);
      });
    }

    $(function() {
      buildSlotContents(wordbox, wordlist);
      buildSlotContents(wordbox, wordlist);
      buildSlotContents(wordbox, wordlist);
      buildSlotContents(wordbox, wordlist);

      setInterval(animate, 2000);
    });
  }

  render() {
    // consider fixing links on lines 92 & 94 and making buttons then redirecting with new function onClick
    return (
      <div className="welcome-container">
        <div className="slottt-machine-recipe">
          <div className="tagline">Plan A...</div>
          <div className="slottt-machine-recipe__mask" id="wordbox">
            <div className="slottt-machine-recipe__items_container recipe_if"></div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="welcome-buttons">
          <Link to="/login">Login</Link>
          &nbsp; &nbsp; &nbsp;
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}
