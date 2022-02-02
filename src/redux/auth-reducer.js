import { authApi } from '../api/api';

const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
const SET_USER             = 'SET_USER';

const INITIAL_STATE = {
  isAuthenticated: undefined,
  user:            null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_IS_AUTHENTICATED: {
      const newState = { ...state };
      newState.isAuthenticated = action.isAuthenticated;
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

const setIsAuthenticated = (isAuthenticated) => ({
  type: SET_IS_AUTHENTICATED, isAuthenticated
});

const setUser = (user) => ({
  type: SET_USER, user
});

export const fetchAuthData = (needToSetUser = false) => (dispatch) => {
  authApi.getAuth().then(
    (data) => {
      if (!data) { return; }
      if (data.status < 0) {
        switch (data.status) {
          case -4:
          case -10:
            console.warn(`Auth API: ${data.status} ${data.message}`);
            dispatch(setIsAuthenticated(false));
            if (needToSetUser) { dispatch(setUser(null)); }
            break;
          default:
            console.error(`Auth API: ${data.status} ${data.message}`);
        }
        return;
      }
      dispatch(setIsAuthenticated(true));
      if (needToSetUser) { dispatch(setUser(data.user)); }
    }
  );
};

export const fetchLoggedStatus = (credentials = null) => (dispatch) => {
  switch (credentials !== null) {
    case true:
      authApi.logIn(credentials).then(
        (data) => {
          if (!data) { return; }
          if (data.status < 0) {
            console.error(`Auth API: ${data.status} ${data.message}`);
            return;
          }
          dispatch(fetchAuthData(true));
        }
      );
      break;
    case false:
      authApi.logOut().then(
        (data) => {
          if (!data) { return; }
          if (data.status < 0) {
            switch (data.status) {
              case -4:
              case -10:
                console.warn(`Auth API: ${data.status} ${data.message}`);
                break;
              default:
                console.error(`Auth API: ${data.status} ${data.message}`);
                return;
            }
          }
          dispatch(setIsAuthenticated(false));
          dispatch(setUser(null));
        }
      );
      break;
    default:
      break;
  };
};

export default authReducer;