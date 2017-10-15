import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Authenticate } from "components";
import auth from "helpers/auth";
import * as userActionCreators from "redux/modules/users";

class AuthenticateContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired
  };

  handleAuth = () => {
    this.props.fetchAndHandleAuthedUser();
  };

  render() {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(userActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AuthenticateContainer
);
