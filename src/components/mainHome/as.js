import React, { Component } from "react";
import { connect } from "react-redux";
import { getMainRequest } from "../../redux/mainGetvotes/actions";
import Subbar from "../Subbar";

class MainHome extends Component {
  componentDidMount() {
    //컴포넌트 렌더링이 맨 처음 완료된 이후 contents 확인
    this.props.getMainRequest().then(() => {
      // 컨텐츠를 가져온다.
      console.log(this.props.contents);
    });
  }

  handleSelect(id) {
    const { history } = this.props;
    history.push(`/content/${id}`);
  }

  render() {
    // const contents = this.props.contents.map((content) => (
    //   <li
    //     onClick={() => this.handleSelect(content.voteId)}
    //     key={content.voteId}
    //   >
    //     {content.title}
    //   </li>
    // ));
    const contents = [1, 2, 3];

    return (
      <div>
        <div>
          <Subbar />
          <ul className="polls">{contents}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contents: state.contents.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMainRequest: () => {
      return dispatch(getMainRequest());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHome);
