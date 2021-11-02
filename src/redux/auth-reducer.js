const SET_USER = 'SET_USER';

const INITIAL_STATE = {
  user: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER: {
      const newState = { ...state };
      newState.user  = action.user;
      return newState;
    }
    default: return state;
  }
};

export const setUser = (user) => ({
  type: SET_USER, user
});

export default authReducer;