import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Navigation } from "components";
import { container, innerContainer } from "./styles.css";

class MainContainer extends Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthed: state.isAuthed
  };
};

export default withRouter(connect(mapStateToProps)(MainContainer));
