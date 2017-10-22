import React from "react";
import PropTypes from "prop-types";
import { DuckContainer } from "containers";
import { userContainer, header } from "./styles.css";
import { errorMsg } from "sharedStyles/styles.css";

const User = props => {
  return props.noUser ? (
    <p className={header}>This user does not exist</p>
  ) : (
    <div>
      {props.isFetching ? (
        <p className={header}>Loading</p>
      ) : (
        <div>
          <div className={userContainer}>{props.name}</div>
          {props.duckIds.map(id => <DuckContainer duckId={id} key={id} />)}
          {props.duckIds.length === 0 && (
            <p className={header}>
              It looks like {props.name.split(" ")[0]} hasn't made any ducks
              yet.
            </p>
          )}
        </div>
      )}
      {props.error && <p className={errorMsg}>{props.error}</p>}
    </div>
  );
};

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired
};

export default User;
