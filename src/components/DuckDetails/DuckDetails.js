import React from "react";
import PropTypes from "prop-types";
import { DuckContainer, RepliesContainer } from "containers";
import { formatReply } from "helpers/utils";
import {
  mainContainer,
  container,
  content,
  repliesContainer,
  replyTextAreaContainer,
  replyTextArea
} from "./styles.css";
import { subHeader, darkBtn, errorMsg } from "sharedStyles/styles.css";

const Reply = ({ submit }) => {
  const handleSubmit = e => {
    if (Reply.ref.value.length === 0) {
      return;
    }

    submit(Reply.ref.value, e);
    Reply.ref.value = "";
  };

  return (
    <div className={replyTextAreaContainer}>
      <textarea
        ref={ref => (Reply.ref = ref)}
        className={replyTextArea}
        maxLength={140}
        placeholder="Your response"
        type="text"
      />
      <button onClick={handleSubmit} className={darkBtn}>
        Submit
      </button>
    </div>
  );
};

Reply.propTypes = {
  submit: PropTypes.func.isRequired
};

const DuckDetails = ({
  duckId,
  isFetching,
  authedUser,
  error,
  addAndHandleReply
}) => {
  return (
    <div className={mainContainer}>
      {isFetching ? (
        <p className={subHeader}>Fetching</p>
      ) : (
        <div className={container}>
          <div className={content}>
            <DuckContainer
              duckId={duckId}
              hideLikeCount={false}
              hideReplyBtn={true}
            />
            <Reply
              submit={replyText =>
                addAndHandleReply(duckId, formatReply(authedUser, replyText))}
            />
          </div>
          <div className={repliesContainer}>
            <RepliesContainer duckId={duckId} />
          </div>
        </div>
      )}
      {error && <p className={error}>{error}</p>}
    </div>
  );
};

DuckDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired
};

export default DuckDetails;
