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

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleAuth = () => {
    this.props.fetchAndHandleAuthedUser().then(() => {
      this.context.router.history.replace("/feed");
    });
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

const mapStateToProps = ({ users }) => {
  return {
    isFetching: users.isFetching,
    error: users.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(userActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AuthenticateContainer
);
