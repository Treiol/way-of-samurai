import { authApi } from '../api/api';

const SET_IS_AUTHENTIFICATED = 'SET_IS_AUTHENTIFICATED';
const SET_USER               = 'SET_USER';

const INITIAL_STATE = {
  isAuthentificated: undefined,
  user:              null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_IS_AUTHENTIFICATED: {
      const newState = { ...state };
      newState.isAuthentificated = action.isAuthentificated;
      return newState;
    }
    case SET_USER: {
      const newState = { ...state };
      newState.user  = action.user;
      return newState;
    }
    default: return state;
  }
};

export const fetchAuthData = (needToSetUser = false) => (dispatch) => {
  authApi.getAuth().then(
    (data) => {
      if (!data) { return; }
      if (data.status < 0) {
        switch (data.status) {
          case -4:
          case -10:
            console.warn(`Auth API: ${data.status} ${data.message}`);
            dispatch(setIsAuthentificated(false));
            if (needToSetUser) { dispatch(setUser(null)); }
            break;
          default:
            console.error(`Auth API: ${data.status} ${data.message}`);
        }
        return;
      }
      dispatch(setIsAuthentificated(true));
      if (needToSetUser) { dispatch(setUser(data.user)); }
    }
  );
};

export const fetchLoggedStatus = (credentials = null) => (dispatch) => {
  switch (credentials !== null) {
    case true:
      break;
    case false:
      authApi.logOut().then(
        (data) => {
          if (!data) { return; }
          if (data.status < 0) {
            console.error(`Auth API: ${data.status} ${data.message}`);
            return;
          }
          return;
        }
      );
      break;
    default:
      break;
  };
};

export const setIsAuthentificated = (isAuthentificated) => ({
  type: SET_IS_AUTHENTIFICATED, isAuthentificated
});

export const setUser = (user) => ({
  type: SET_USER, user
});

export default authReducer;