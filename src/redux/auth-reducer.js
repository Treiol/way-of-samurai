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

export const setIsAuthentificated = (isAuthentificated) => ({
  type: SET_IS_AUTHENTIFICATED, isAuthentificated
});

export const setUser = (user) => ({
  type: SET_USER, user
});

export default authReducer;