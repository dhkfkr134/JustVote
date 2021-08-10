import React, { Component } from "react";
import { Memo } from "components";
import PropTypes from "prop-types";

class MainContents extends Component {
  render() {
    const mapToComponents = (data) => {
      return data.map((memo, i) => {
        return (
          <Memo
            data={memo}
            ownership={memo.writer === this.props.currentUser}
            key={memo._id}
            index={i}
          />
        );
      });
    };
    return <div>{mapToComponents(this.props.data)}</div>;
  }
}

MainContents.propTypes = {
  data: PropTypes.array,
  currentUser: PropTypes.string,
};

MainContents.defaultProps = {
  data: [],
  currentUser: "",
};

export default MainContents;
