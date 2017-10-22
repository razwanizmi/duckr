import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { DuckDetails } from "components";
import * as ducksActionCreators from "redux/modules/ducks";
import * as likeCountActionCreators from "redux/modules/likeCount";

class DuckDetailsContainer extends Component {
  static propTypes = {
    authedUser: PropTypes.object.isRequired,
    duckId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    duckAlreadyFetched: PropTypes.bool.isRequired,
    removeFetching: PropTypes.func.isRequired,
    fetchAndHandleDuck: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.initLikeFetch(this.props.duckId);

    if (this.props.duckAlreadyFetched) {
      this.props.removeFetching();
    } else {
      this.props.fetchAndHandleDuck(this.props.duckId);
    }
  }

  render() {
    return (
      <DuckDetails
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        error={this.props.error}
      />
    );
  }
}

const mapStateToProps = ({ ducks, likeCount, users }, props) => {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error || likeCount.error,
    authedUser: users[users.authedId].info,
    duckId: props.match.params.duckId,
    duckAlreadyFetched: !!ducks[props.match.params.duckId]
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { ...ducksActionCreators, ...likeCountActionCreators },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  DuckDetailsContainer
);
