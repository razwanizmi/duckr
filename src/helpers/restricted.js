import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { checkIfAuthed } from "./auth";

export default (BaseComponent, store) => {
  class Restricted extends Component {
    checkAuthentication = ({ history }) => {
      const nextPathName = history.location.pathname;
      const isAuthed = checkIfAuthed(store);
      if (nextPathName === "/" || nextPathName === "/auth") {
        if (isAuthed) {
          history.replace("/feed");
        }
      } else {
        if (!isAuthed) {
          history.replace("/auth");
        }
      }
    };

    componentWillMount() {
      this.checkAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return withRouter(Restricted);
};
