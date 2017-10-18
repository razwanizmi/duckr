import React from "react";
import PropTypes from "prop-types";
import { DuckContainer } from "containers";
import { newDuckContainer, header } from "./styles.css";
import { errorMsg } from "sharedStyles/styles.css";

const NewDucksAvailable = ({ handleClick }) => (
  <div className={newDuckContainer}>New ducks available</div>
);

NewDucksAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired
};

const Feed = props => {
  return props.isFetching ? (
    <h1 className={header}>Fetching</h1>
  ) : (
    <div>
      {props.newDucksAvailable && (
        <NewDucksAvailable handleClick={props.resetNewDucksAvailable} />
      )}
      {props.duckIds.length === 0 && (
        <p className={header}>
          This is unfortunate.
          <br />
          It appears that there are no ducks yet.
        </p>
      )}
      {props.duckIds.map(id => <DuckContainer duckId={id} key={id} />)}
      {props.error && <p className={errorMsg}>{props.error}</p>}
    </div>
  );
};

Feed.propTypes = {
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  duckIds: PropTypes.array.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired
};

export default Feed;
