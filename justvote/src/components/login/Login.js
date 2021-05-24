import React, { Component } from "react";
import Authentication from "./Authentication";
import { connect } from "react-redux";
import { loginRequest } from "../../redux/authentication/actions";

class Login extends Component {
  handleLogin = (id, pw) => {
    return this.props.loginRequest(id, pw).then(() => {
      if (this.props.status === "SUCCESS") {
        // create session data
        let loginData = {
          isLoggedIn: true,
          userId: id,
        };

        document.cookie = "key=" + btoa(JSON.stringify(loginData));

        this.props.history.push("/");
        return true;
      } else {
        return false;
      }
    });
  };

  render() {
    return (
      <div>
        <Authentication onLogin={this.handleLogin} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      console.log("id: " + id);
      console.log("pw: " + pw);
      return dispatch(loginRequest(id, pw));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);