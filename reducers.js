// User
const initialUserState = {
  lastUpdated: 0,
  info: {
    name: "",
    uid: "",
    avatar: ""
  }
};

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return { ...state, info: action.user, lastUpdated: action.timeStamp };
    default:
      return state;
  }
};

// Users
const initialState = {
  isFetching: false,
  error: "",
  isAuthed: false,
  authedId: ""
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isAuthed: true, authedId: action.uid };
    case UNAUTH_USER:
      return { ...state, isAuthed: false, authedId: "" };
    case FETCHING_USER:
      return { ...state, isFetching: true };
    case FETCHING_USER_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? { ...state, error: "", isFetching: false }
        : {
            ...state,
            error: "",
            isFetching: false,
            [action.uid]: user(state[action.uid], action.type)
          };
    default:
      return state;
  }
};

// Ducks
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
    case ADD_MULTIPLE_DUCK:
      return { ...state, ...action.ducks };
    default:
      return state;
  }
};

// Feed
const initialState = {
  isFetching: false,
  newDucksAvailable: false,
  newDucksToAdd: [],
  error: "",
  duckIds: []
};

const feed = (state, action) => {
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

// Listeners
const listeners = (state = {}, action) => {
  switch (action.type) {
    case ADD_LISTENER:
      return { ...state, [action.listenerId]: true };
    default:
      return state;
  }
};

// Modal
const initialState = {
  duckText: "",
  isOpen: false
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true };
    case CLOSE_MODAL:
      return { ...state, duckText: "", isOpen: false };
    case UPDATE_DUCK_TEXT:
      return { ...state, duckText: action.newDuckText };
    default:
      return state;
  }
};

// User Likes
const initialState = {
  isFetching: false,
  error: ""
};

const usersLikes = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_LIKES:
      return { ...state, isFetching: true };
    case FETCHING_LIKES_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case FETCHING_LIKE_SUCCESS:
      return { ...state, ...action.likes, isFetching: false, error: "" };
    case ADD_LIKE:
      return { ...state, [action.duckId]: true };
    case REMOVE_LIKE:
      return Object.keys(state)
        .filter(duckId => action.duckId !== duckId)
        .reduce((accumulator, current) => {
          accumulator[current] = state[current];
          return accumulator;
        }, {});
    default:
      return state;
  }
};

// Like Count
const count = (state = 0, action) => {
  switch (action.type) {
    case ADD_LIKE:
      return state + 1;
    case REMOVE_LIKE:
      return state - 1;
    default:
      return state;
  }
};

const initialState = {
  isFetching: false,
  error: ""
};

const likeCount = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_COUNT:
      return { ...state, isFetching: true };
    case FETCHING_COUNT_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case FETCHING_COUNT_SUCCESS:
      return { ...state, ...initialState, [action.duckId]: action.count };
    case ADD_LIKE:
    case REMOVE_LIKE:
      return typeOf(action.duckId) === "undefined"
        ? state
        : { ...state, [action.duckId]: count(state.action[duckId], action) };
    default:
      return state;
  }
};

// Users Ducks
const initialUsersDuckState = {
  lastUpdated: 0,
  duckIds: []
};

const usersDuck = (state = initialUsersDuckState, action) => {
  switch (action.type) {
    case ADD_SINGLE_USERS_DUCKS:
      return { ...state, duckIds: duckIds.concat([action.duckId]) };
    default:
      return state;
  }
};

const initialState = {
  isFetching: true,
  error: ""
};

usersDucks = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USERS_DUCKS:
      return { ...state, isFetching: true };
    case FETCHING_USERS_DUCKS_ERRORS:
      return { ...state, isFetching: false, error: action.error };
    case FETCHING_USERS_DUCKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          duckIds: action.ducksIds
        }
      };
    case ADD_SINGLE_USERS_DUCKS:
      return typeof state[action.uid] === "undefined"
        ? state
        : {
            ...state,
            isFetching: false,
            error: "",
            [action.uid]: usersDuck(state[action.uid])
          };
    default:
      return state;
  }
};

// Replies
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
