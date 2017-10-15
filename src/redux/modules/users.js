import auth, { logout } from "helpers/auth";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const FETCHING_USER = "FETCHING_USER";
const FETCHING_USER_FAILURE = "FETCHING_USER_FAILURE";
const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";

const authUser = uid => {
  return {
    type: AUTH_USER,
    uid
  };
};

const unauthUser = () => {
  return {
    type: UNAUTH_USER
  };
};

const fetchingUser = () => {
  return {
    type: FETCHING_USER
  };
};

const fetchingUserFailure = error => {
  return {
    type: FETCHING_USER_FAILURE,
    error: "Error fetching user"
  };
};

const fetchingUserSuccess = (uid, user, timestamp) => {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp
  };
};

export const fetchAndHandleAuthedUser = () => {
  return dispatch => {
    dispatch(fetchingUser());
    return auth()
      .then(user => {
        dispatch(fetchingUserSuccess(user.uid, user, Date.now()));
        dispatch(authUser(user.uid));
      })
      .catch(error => {
        dispatch(fetchingUserFailure());
      });
  };
};

export const logoutAndUnauth = () => {
  return dispatch => {
    logout();
    dispatch(unauthUser());
  };
};

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
      return { ...state, info: action.user, lastUpdated: action.timestamp };
    default:
      return state;
  }
};

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
      return { ...state, isAuthed: false, authId: "" };
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
            [action.uid]: user(state[action.uid], action)
          };
    default:
      return state;
  }
};

export default users;
