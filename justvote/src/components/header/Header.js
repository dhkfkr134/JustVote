// Header는 Topbar를
import React, { Component } from "react";
import TopBar from "./TopBar";
import { connect } from "react-redux";
import {
  getStatusRequest,
  logoutRequest,
} from "../../redux/authentication/actions";
import {
  getMainSearch,
} from "../../redux";

class Header extends Component {
  componentDidMount() {
    //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인

    // check whether this cookie is valid or not
    this.props.getStatusRequest().then(() => {
      console.log(this.props.status.valid);
      if (!this.props.status.valid) {

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

  handleSearch = (search) => {
    this.props.getMainSearch(search)

  }

  render() {
    /* Check whether current route is login or register using regex */

    let thisPath = this.props.location.pathname;

    // 현재 경로가 '/'라면 Home으로 이동
    if (thisPath === "/") {
      this.props.history.push("/Home/all");
    }

    return (
      <div>
        <div>
          <TopBar
            isLoggedIn={this.props.status.isLoggedIn}
            onLogout={this.handleLogout}
            handleSearch={this.handleSearch}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMainSearch: (search) => {
      return dispatch(getMainSearch(search));
    },
    getStatusRequest: () => {
      return dispatch(getStatusRequest());
    },
    logoutRequest: () => {
      return dispatch(logoutRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);