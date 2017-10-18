import { saveDuck } from "helpers/api";
import { closeModal } from "./modal";
import { addSingleUsersDuck } from "./usersDucks";

const FETCHING_DUCK = "FETCHING_DUCK";
const FETCHING_DUCK_ERROR = "FETCHING_DUCK_ERROR";
const FETCHING_DUCK_SUCCESS = "FETCHING_DUCK_SUCCESS";
const REMOVE_FETCHING = "REMOVE_FETCHING";
const ADD_DUCK = "ADD_DUCK";
const ADD_MULTIPLE_DUCKS = "ADD_MULTIPLE_DUCKS";

const fetchingDuck = () => {
  return {
    type: FETCHING_DUCK
  };
};

const fetchingDuckError = error => {
  return {
    type: FETCHING_DUCK_ERROR,
    error: error
  };
};

const fetchingDuckSuccess = duck => {
  return {
    type: FETCHING_DUCK_SUCCESS,
    duck
  };
};

const removeFetching = () => {
  return {
    type: REMOVE_FETCHING
  };
};

const addDuck = duck => {
  return {
    type: ADD_DUCK,
    duck
  };
};

export const duckFanOut = duck => {
  return (dispatch, getState) => {
    const uid = getState().users.authedId;
    saveDuck(duck)
      .then(duckWithId => {
        dispatch(addDuck(duckWithId));
        dispatch(closeModal());
        dispatch(addSingleUsersDuck(uid, duckWithId.duckId));
      })
      .catch(error => {
        console.warn("Error in duckFanout", error);
      });
  };
};

const addMultipleDucks = ducks => {
  return {
    type: ADD_MULTIPLE_DUCKS,
    ducks
  };
};

const initialState = {
  isFetching: true,
  error: ""
};

const ducks = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DUCK:
      return { ...state, isFetching: true };
    case ADD_DUCK:
    case FETCHING_DUCK_SUCCESS:
      return { ...state, isFetching: false, [action.duck.duckId]: action.duck };
    case FETCHING_DUCK_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case REMOVE_FETCHING:
      return { ...state, isFetching: false, error: "" };
    case ADD_MULTIPLE_DUCKS:
      return { ...state, ...action.ducks };
    default:
      return state;
  }
};

export default ducks;
