import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Replies } from "components";
import { staleReplies } from "helpers/utils";
import * as repliesActionCreators from "redux/modules/replies";

class RepliesContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    replies: PropTypes.object.isRequired,
    duckId: PropTypes.string.isRequired,
    fetchAndHandleReplies: PropTypes.func.isRequired
  };

  static defaultProps = {
    lastUpdated: 0,
    replies: {}
  };

  componentDidMount() {
    if (staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleReplies(this.props.duckId);
    }
  }

  render() {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        replies={this.props.replies}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const duckRepliesInfo = state.replies[props.duckId] || {};
  const { lastUpdated, replies } = duckRepliesInfo;

  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(repliesActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RepliesContainer);
