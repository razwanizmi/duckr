import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Duck } from "components";
import * as usersLikesActionCreators from "redux/modules/usersLikes";

class DuckContainer extends Component {
  static propTypes = {
    duck: PropTypes.object.isRequired,
    numberOfLIkes: PropTypes.number,
    isLiked: PropTypes.bool.isRequired,
    hideLikeCount: PropTypes.bool.isRequired,
    hideReplyBtn: PropTypes.bool.isRequired,
    handleDeleteLike: PropTypes.func.isRequired,
    addAndHandleLike: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static defaultProps = {
    hideLikeCount: true,
    hideReplyBtn: false
  };

  goToProfile = e => {
    e.stopPropagation();
    this.context.router.history.replace(`/${this.props.duck.uid}`);
  };

  handleClick = e => {
    e.stopPropagation();
    this.context.router.history.replace(
      `/duckDetail/${this.props.duck.duckId}`
    );
  };

  render() {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn ? null : this.handleClick}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({ ducks, likeCount, usersLikes }, props) => {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId]
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(usersLikesActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DuckContainer);
