import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import {
  newDuckTop,
  pointer,
  newDuckInputContainer,
  newDuckInput,
  submitDuckBtn,
  darkBtn
} from "./styles.css";

const modalStyles = {
  content: {
    width: 350,
    margin: "0 auto",
    height: 220,
    borderRadius: 5,
    background: "#ebebeb",
    padding: 0
  }
};

const Modal = props => {
  const submitDuck = () => {
    console.log("Duck", props.duckText);
    console.log("User", props.user);
  };

  return (
    <div>
      <span className={darkBtn} onClick={props.openModal}>
        Duck
      </span>
      <ReactModal
        style={modalStyles}
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel="Modal"
      >
        <div className={newDuckTop}>
          <span>Compose new Duck</span>
          <span className={pointer} onClick={props.closeModal}>
            X
          </span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={e => props.updateDuckText(e.target.value)}
            className={newDuckInput}
            value={props.duckText}
            maxLength={140}
            type="text"
            placeholder="What's on your mind?"
          />
        </div>
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}
        >
          Duck
        </button>
      </ReactModal>
    </div>
  );
};

Modal.propTypes = {
  duckText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateDuckText: PropTypes.func.isRequired
};

export default Modal;
