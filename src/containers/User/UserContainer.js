import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { User } from "components";
import * as usersActionCreators from "redux/modules/users";
import * as usersDucksActionCreators from "redux/modules/usersDucks";
import { staleUser, staleDucks } from "helpers/utils";

class UserContainer extends Component {
  static propTypes = {
    noUser: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    duckIds: PropTypes.array.isRequired,
    lastUpdatedUser: PropTypes.number.isRequired,
    lastUpdatedDucks: PropTypes.number.isRequired,
    fetchAndHandleUsersDucks: PropTypes.func.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired
  };

  componentDidMount() {
    const uid = this.props.match.params.uid;

    if (this.props.noUser || staleUser(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandleUser(uid);
    }

    if (this.props.noUser || staleDucks(this.props.lastUpdatedDucks)) {
      this.props.fetchAndHandleUsersDucks(uid);
    }
  }

  render() {
    return (
      <User
        noUser={this.props.noUser}
        name={this.props.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        duckIds={this.props.duckIds}
      />
    );
  }
}

const mapStateToProps = ({ users, usersDucks }, props) => {
  const uid = props.match.params.uid;
  const specificUsersDucks = usersDucks[uid];
  const user = users[uid];
  const noUser = typeof user === "undefined";

  return {
    noUser,
    name: noUser ? "" : user.info.name,
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    duckIds: specificUsersDucks ? specificUsersDucks.duckIds : [],
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedDucks: specificUsersDucks ? specificUsersDucks.lastUpdated : 0
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { ...usersActionCreators, ...usersDucksActionCreators },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
