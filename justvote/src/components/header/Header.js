// Header는 Topbar를
import React, { Component } from "react";
import TopBar from "./TopBar";
import { connect } from "react-redux";
import {
  getStatusRequest,
  logoutRequest,
} from "../../redux/authentication/actions";

class Header extends Component {
  componentDidMount() {
    //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인
    // get cookie by name
    console.log("header-cookie : " + document.cookie);
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }

    // get loginData from cookie
    let loginData = getCookie("key");

    // if loginData is undefined, do nothing
    if (typeof loginData === "undefined") return;

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));
    console.log(loginData);
    // if not logged in, do nothing
    if (!loginData.isLoggedIn) return;

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(() => {
      // if session is not valid
      console.log(this.props.status.valid);
      if (!this.props.status.valid) {
        // logout the session
        loginData = {
          isLoggedIn: false,
          userId: "",
        };

        document.cookie = "key=" + btoa(JSON.stringify(loginData));

        // and notify
        //let $toastContent = $();
        //'<span style="color: #FFB4BA">Your session is expired, please log in again</span>'
        //Materialize.toast($toastContent, 4000);
      }
    });
  }

  handleLogout = () => {
    this.props.logoutRequest().then(() => {
      //Materialize.toast("Good Bye!", 2000);

      // EMPTIES THE SESSION
      let loginData = {
        isLoggedIn: false,
        username: "",
      };

      document.cookie = "key=" + btoa(JSON.stringify(loginData));
    });
  };

  render() {
    /* Check whether current route is login or register using regex */

    let thisPath = this.props.location.pathname;

    // 현재 경로가 '/'라면 Home으로 이동
    if (thisPath === "/") {
      this.props.history.push("/Home");
    }

    return (
      <div>
        <div>
          <TopBar
            isLoggedIn={this.props.status.isLoggedIn}
            onLogout={this.handleLogout}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(
    "state.authentication.status.isLoggedIn" +
      state.authentication.status.isLoggedIn
  );
  return {
    status: state.authentication.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
