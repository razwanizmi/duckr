import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Feed } from "components";
import * as feedActionCreators from "redux/modules/feed";

class FeedContainer extends Component {
  static propTypes = {
    newDucksAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    duckIds: PropTypes.array.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewDucksAvailable: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.setAndHandleFeedListener();
  }

  render() {
    return (
      <Feed
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        duckIds={this.props.duckIds}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
      />
    );
  }
}

const mapStateToProps = ({ feed }) => {
  const { newDucksAvailable, error, isFetching, duckIds } = feed;

  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(feedActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
