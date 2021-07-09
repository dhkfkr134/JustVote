import React, { Component } from "react";
import { useSelector } from "react-redux";
import Authentication from "./Authentication";
import { connect } from "react-redux";
import { loginRequest } from "../../redux/authentication/actions";

class Login extends Component {
  handleLogin = (id, pw) => {
    return this.props.loginRequest(id, pw).then(() => {
      console.log(this.props.history);
      if (this.props.status === "SUCCESS") {
        // create session data
        let loginData = {
          isLoggedIn: true,
          userId: id,
        };
        document.cookie = "key=" + btoa(JSON.stringify(loginData));
        console.log("login-cookie : ");
        console.log(document.cookie);

        // 로그인 성공시 루트 화면으로 돌아감.
        this.props.history.push("/");
        return true;
      } else {
        console.log("login-cookie-fail");
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
  console.log(state);
  return {
    status: state.authentication.login.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (id, pw) => {
      console.log("mapDispatchToProps");
      return dispatch(loginRequest(id, pw));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
