import { addListener } from "./listeners";
import { addMultipleDucks } from "./ducks";
import { listenToFeed } from "helpers/api";

const SETTING_FEED_LISTENER = "SETTING_FEED_LISTENER";
const SETTING_FEED_LISTENER_ERROR = "SETTING_FEED_LISTENER_ERROR";
const SETTING_FEED_LISTENER_SUCCESS = "SETTING_FEED_LISTENER_SUCCESS";
const ADD_NEW_DUCK_ID_TO_FEED = "ADD_NEW_DUCK_ID_TO_FEED";
const RESET_NEW_DUCKS_AVAILABLE = "RESET_NEW_DUCKS_AVAILABLE";

const settingFeedListener = () => {
  return {
    type: SETTING_FEED_LISTENER
  };
};

const settingFeedListenerError = error => {
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: error
  };
};

const settingFeedListenerSuccess = duckIds => {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    duckIds
  };
};

const addNewDuckIdToFeed = duckId => {
  return {
    type: ADD_NEW_DUCK_ID_TO_FEED,
    duckId
  };
};

export const resetNewDucksAvailable = () => {
  return {
    type: RESET_NEW_DUCKS_AVAILABLE
  };
};

export const setAndHandleFeedListener = () => {
  let initialFetch = true;

  return (dispatch, getState) => {
    if (getState().listeners.feed === true) {
      return;
    }

    dispatch(addListener("feed"));
    dispatch(settingFeedListener());

    listenToFeed(
      ({ feed, sortedIds }) => {
        dispatch(addMultipleDucks(feed));
        initialFetch
          ? dispatch(settingFeedListenerSuccess(sortedIds))
          : dispatch(addNewDuckIdToFeed(sortedIds[0]));
      },
      error => dispatch(settingFeedListenerError(error))
    );
  };
};

const initialState = {
  isFetching: false,
  newDucksAvailable: false,
  newDucksToAdd: [],
  error: "",
  duckIds: []
};

const feed = (state = initialState, action) => {
  switch (action.type) {
    case SETTING_FEED_LISTENER:
      return { ...state, isFetching: true };
    case SETTING_FEED_LISTENER_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case SETTING_FEED_LISTENER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        duckIds: action.duckIds,
        newDucksAvailable: false
      };
    case ADD_NEW_DUCK_ID_TO_FEED:
      return {
        ...state,
        newDucksToAdd: [...state.newDucksToAdd, action.duckId]
      };
    case RESET_NEW_DUCKS_AVAILABLE:
      return {
        ...state,
        duckIds: [...state.newDucksToAdd, ...state.duckIds],
        newDucksToAdd: [],
        newDucksAvailable: false
      };
    default:
      return state;
  }
};

export default feed;
