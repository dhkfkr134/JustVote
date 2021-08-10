import React, { Component } from "react";
import * as RBS from "react-bootstrap";
import PropTypes from "prop-types";

class TopBar extends Component {
  render() {
    const loginButton = (
      <RBS.Nav>
        <RBS.Nav.Link href="/SignUp">JOIN US</RBS.Nav.Link>
        <RBS.Nav.Link eventKey={2} href="/SignIn">
          SIGN IN
        </RBS.Nav.Link>
      </RBS.Nav>
    );

    const logoutButton = (
      <RBS.Nav>
        <RBS.Nav.Link eventKey={2} href="/" onClick={this.props.onLogout}>
          LOG OUT
        </RBS.Nav.Link>
      </RBS.Nav>
    );

    return (
      <RBS.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <RBS.Navbar.Brand href="/">JustVote</RBS.Navbar.Brand>
        <RBS.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <RBS.Navbar.Collapse id="responsive-navbar-nav">
          <RBS.Nav className="mr-auto">
            <RBS.Nav.Link href="/MakeVote">Make Vote</RBS.Nav.Link>
            <RBS.Nav.Link href="/Ranking">Ranking {"&"} rank</RBS.Nav.Link>
            <RBS.NavDropdown title="Introduce" id="collasible-nav-dropdown">
              <RBS.NavDropdown.Item href="Introduce/3.1 ">
                연혁
              </RBS.NavDropdown.Item>
              <RBS.NavDropdown.Item href="Introduce/3.2">
                목표
              </RBS.NavDropdown.Item>
              <RBS.NavDropdown.Divider />
              <RBS.NavDropdown.Item href="Introduce/3.3">
                JustVote Team
              </RBS.NavDropdown.Item>
            </RBS.NavDropdown>
          </RBS.Nav>
          {this.props.isLoggedIn ? logoutButton : loginButton}
          <RBS.Form inline>
            <RBS.FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <RBS.Button variant="outline-info">Search</RBS.Button>
          </RBS.Form>
        </RBS.Navbar.Collapse>
      </RBS.Navbar>
    );
  }
}

TopBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
};

TopBar.defaultProps = {
  isLoggedIn: false,
  onLogout: () => {
    console.error("logout function not defined");
  },
};

export default TopBar;
