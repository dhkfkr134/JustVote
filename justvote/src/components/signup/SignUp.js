/* 회원가입 */

import React, { Component } from "react";
import { useSelector } from "react-redux";
import AuthSignUp from "./AuthSignUp";
import { connect } from "react-redux";
import { registerRequest } from "../../redux/signup/actions";
import {
  duplicateCheckRequest,
  duplicateCheckNicknameRequest,
} from "../../redux/signup/actions";

class SignUp extends Component {
  handleRegister = (body) => {
    return this.props.registerRequest(body).then(() => {
      console.log(this.props.history);
      if (this.props.statusReg === "SUCCESS") {
        // 회원가입 성공시 로그인 화면으로 돌아감.
        this.props.history.push("/SignIn");
        return true;
      } else {
        console.log("회원가입 실패");
        return false;
      }
    });
  };

  handleCheckID = (userID) => {
    return this.props.duplicateCheckRequest(userID).then(() => {
      if (this.props.statusID === "ABLE") {
        // 사용 가능 시 사용가능 메세지 > 박스 띄워주기
        return true;
      } else {
        return false;
      }
    });
  };

  handleCheckNickname = (nickName) => {
    return this.props.duplicateCheckNicknameRequest(nickName).then(() => {
      if (this.props.statusNickname === "ABLE") {
        // 사용 가능 시 사용가능 메세지 > 박스 띄워주기
        return true;
      } else {
        return false;
      }
    });
  };

  render() {
    return (
      <div>
        <AuthSignUp
          onRegister={this.handleRegister}
          onCheckID={this.handleCheckID}
          statusID={this.props.statusID}
          statusNickname={this.props.statusNickname}
          onCheckNickname={this.handleCheckNickname}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    statusReg: state.register.register.status,
    statusID: state.register.duplicate.status,
    statusNickname: state.register.duplicateNickname.status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (body) => {
      return dispatch(registerRequest(body));
    },
    duplicateCheckRequest: (userID) => {
      return dispatch(duplicateCheckRequest(userID));
    },
    duplicateCheckNicknameRequest: (nickName) => {
      return dispatch(duplicateCheckNicknameRequest(nickName));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
