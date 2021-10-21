const ACTION_FOLLOW    = 'ACTION_FOLLOW';
const ACTION_UNFOLLOW  = 'ACTION_UNFOLLOW';
const ACTION_SET_USERS = 'ACTION_SET_USERS';

const INITIAL_STATE = {
  users: []
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_FOLLOW: {
      const newState = { ...state };
      return newState;
    }
    case ACTION_UNFOLLOW: {
      const newState = { ...state };
      return newState;
    }
    case ACTION_SET_USERS: {
      const newState = { ...state };
      newState.users = action.users;
      return newState;
    }
    default: return state;
  }
};

export const acFollow = (userId) => ({
  type: ACTION_FOLLOW, userId
});

export const acUnfollow = (userId) => ({
  type: ACTION_UNFOLLOW, userId
});

export const acSetUsers = (users) => ({
  type: ACTION_SET_USERS, users
});

export default usersReducer;