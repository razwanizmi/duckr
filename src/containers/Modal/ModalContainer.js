import { Modal } from "components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as modalActionCreators from "redux/modules/modal";

const mapStateToProps = ({ modal, users }) => {
  const duckTextLength = modal.duckText.length;

  return {
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    user: users[users.authedId] ? users[users.authedId].info : {},
    isSubmitDisabled: duckTextLength === 0 || duckTextLength > 140
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(modalActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
