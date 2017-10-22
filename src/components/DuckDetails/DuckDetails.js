import React from "react";
import PropTypes from "prop-types";
import { DuckContainer } from "containers";
import {
  mainContainer,
  container,
  content,
  repliesContainer,
  replyTextAreaContainer,
  replyTextArea
} from "./styles.css";
import { subHeader, darkBtn, errorMsg } from "sharedStyles/styles.css";

const DuckDetails = ({ duckId, isFetching, authedUser, error }) => {
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
            Make a Reply
          </div>
          <div className={repliesContainer}>
            Reply Section
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
  error: PropTypes.string.isRequired
};

export default DuckDetails;