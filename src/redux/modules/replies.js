import { postReply, fetchReplies } from "helpers/api";

const FETCHING_REPLIES = "FETCHING_REPLIES";
const FETCHING_REPLIES_ERROR = "FETCHING_REPLIES_ERROR";
const FETCHING_REPLIES_SUCCESS = "FETCHING_REPLIES_SUCCESS";
const ADD_REPLY = "ADD_REPLY";
const ADD_REPLY_ERROR = "ADD_REPLY_ERROR";
const REMOVE_REPLY = "REMOVE_REPLY";

const fetchingReplies = () => {
  return {
    type: FETCHING_REPLIES
  };
};

const fetchingRepliesError = error => {
  console.warn(error);
  return {
    type: FETCHING_REPLIES_ERROR,
    error: "Error fetching replies."
  };
};

const fetchingRepliesSuccess = (duckId, replies) => {
  return {
    type: FETCHING_REPLIES_SUCCESS,
    replies,
    duckId,
    lastUpdated: Date.now()
  };
};

const addReply = (duckId, reply) => {
  return {
    type: ADD_REPLY,
    duckId,
    reply
  };
};

const addReplyError = error => {
  console.warn(error);
  return {
    type: ADD_REPLY_ERROR,
    error: "Error adding reply"
  };
};

const removeReply = (replyId, duckId) => {
  return {
    type: REMOVE_REPLY,
    replyId,
    duckId
  };
};

export const addAndHandleReply = (duckId, reply) => {
  return dispatch => {
    const { replyWithId, replyPromise } = postReply(duckId, reply);

    dispatch(addReply(duckId, replyWithId));
    replyPromise.catch(error => {
      dispatch(removeReply(duckId, replyWithId.replyId));
      dispatch(addReplyError(error));
    });
  };
};

export const fetchAndHandleReplies = duckId => {
  return dispatch => {
    dispatch(fetchingReplies());

    fetchReplies(duckId)
      .then(replies => dispatch(fetchingRepliesSuccess(duckId, replies)))
      .catch(error => fetchingRepliesError(error));
  };
};

const initialReplyState = {
  name: "",
  reply: "",
  uid: "",
  timeStamp: 0,
  avatar: "",
  replyId: ""
};

const duckReplies = (state = initialReplyState, action) => {
  switch (action.type) {
    case ADD_REPLY:
      return { ...state, [action.reply.replyId]: action.reply };
    case REMOVE_REPLY:
      return { ...state, [action.reply.replyId]: undefined };
    default:
      return state;
  }
};

const initialDuckState = {
  lastUpdated: Date.now(),
  replies: {}
};

const repliesAndLastUpdated = (state = initialDuckState, action) => {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies
      };
    case ADD_REPLY:
    case REMOVE_REPLY:
      return { ...state, replies: duckReplies(state.replies, action) };
    default:
      return state;
  }
};

const initialState = {
  isFetching: true,
  error: ""
};

const replies = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_REPLIES:
      return { ...state, isFetching: true };
    case FETCHING_REPLIES_ERROR:
    case ADD_REPLY_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case ADD_REPLY:
    case FETCHING_REPLIES_SUCCESS:
    case REMOVE_REPLY:
      return {
        ...state,
        isFetching: false,
        error: "",
        [action.duckId]: repliesAndLastUpdated(state[action.duckId], action)
      };
    default:
      return state;
  }
};

export default replies;
