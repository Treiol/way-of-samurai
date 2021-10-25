const ACTION_FOLLOW             = 'ACTION_FOLLOW';
const ACTION_UNFOLLOW           = 'ACTION_UNFOLLOW';
const ACTION_SET_FETCHED_USERS  = 'ACTION_SET_FETCHED_USERS';
const ACTION_SET_PAGE_PARAMS    = 'ACTION_SET_PAGE_PARAMS';
const ACTION_SET_USERS_FETCHING = 'ACTION_SET_USERS_FETCHING';

const INITIAL_STATE = {
  fetchedUsers: [],
  isFetching:   false,
  pageParams: {
    currentPage: 1,
    pageSize:    10,
    pagesCount:  0
  }
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_FOLLOW: {
      const newState = { ...state };
      newState.fetchedUsers = state.fetchedUsers.map(
        (fetchedUser) => {
          if (fetchedUser.id === action.userId) { fetchedUser.followed = true; }
          return fetchedUser;
        }
      );
      return newState;
    }
    case ACTION_UNFOLLOW: {
      const newState = { ...state };
      newState.fetchedUsers = state.fetchedUsers.map(
        (fetchedUser) => {
          if (fetchedUser.id === action.userId) { fetchedUser.followed = false; }
          return fetchedUser;
        }
      );
      return newState;
    }
    case ACTION_SET_FETCHED_USERS: {
      const newState = { ...state };
      newState.fetchedUsers = action.fetchedUsers;
      return newState;
    }
    case ACTION_SET_PAGE_PARAMS: {
      const newState      = { ...state };
      newState.pageParams = { ...state.pageParams };
      for (let p in action.pageParams) { newState.pageParams[p] = action.pageParams[p]; }
      return newState;
    }
    case ACTION_SET_USERS_FETCHING: {
      const newState      = { ...state };
      newState.isFetching = action.isFetching;
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

export const acSetFetchedUsers = (fetchedUsers) => ({
  type: ACTION_SET_FETCHED_USERS, fetchedUsers
});

export const acSetPageParams = (pageParams) => ({
  type: ACTION_SET_PAGE_PARAMS, pageParams
});

export const acSetUsersFetching = (isFetching) => ({
  type: ACTION_SET_USERS_FETCHING, isFetching
});

export default usersReducer;