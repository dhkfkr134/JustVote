import React, { Component } from "react";
import { SubbarItems } from "./SubbarItems";
import * as ReactBootStrap from "react-bootstrap";
import "./Subbar.css";

class Subbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    return (
      <div className="sub-group">
        <div className="sub-icon" onClick={this.handleClick}>
          <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}>
            {" "}
          </i>
        </div>
        <ul className={this.state.clicked ? "sub-menu active" : "sub-menu"}>
          <ReactBootStrap.Dropdown>
            <ReactBootStrap.Dropdown.Toggle variant="light" id="dropdown-basic">
              나열
            </ReactBootStrap.Dropdown.Toggle>
            <ReactBootStrap.Dropdown.Menu>
              <ReactBootStrap.Dropdown.Item href="#/action-1">
                Popular
              </ReactBootStrap.Dropdown.Item>
              <ReactBootStrap.Dropdown.Item href="#/action-2">
                A
              </ReactBootStrap.Dropdown.Item>
              <ReactBootStrap.Dropdown.Item href="#/action-3">
                B
              </ReactBootStrap.Dropdown.Item>
            </ReactBootStrap.Dropdown.Menu>
          </ReactBootStrap.Dropdown>
          {SubbarItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Subbar;
