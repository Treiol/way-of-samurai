const FOLLOW                 = 'FOLLOW';
const UNFOLLOW               = 'UNFOLLOW';
const SET_FETCHED_USERS      = 'SET_FETCHED_USERS';
const SET_IS_AUTHENTIFICATED = 'SET_IS_AUTHENTIFICATED';
const SET_IS_FETCHING        = 'SET_IS_FETCHING';
const SET_PAGE_PARAMS        = 'SET_PAGE_PARAMS';

const INITIAL_STATE = {
  fetchedUsers:      [],
  isAuthentificated: undefined,
  isFetching:        false,
  pageParams: {
    currentPage: 1,
    pageSize:    10,
    pagesCount:  0
  }
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FOLLOW: {
      const newState = { ...state };
      newState.fetchedUsers = state.fetchedUsers.map(
        (fetchedUser) => {
          if (fetchedUser.id === action.userId) { fetchedUser.is_followed = true; }
          return fetchedUser;
        }
      );
      return newState;
    }
    case UNFOLLOW: {
      const newState = { ...state };
      newState.fetchedUsers = state.fetchedUsers.map(
        (fetchedUser) => {
          if (fetchedUser.id === action.userId) { fetchedUser.is_followed = false; }
          return fetchedUser;
        }
      );
      return newState;
    }
    case SET_FETCHED_USERS: {
      const newState = { ...state };
      newState.fetchedUsers = action.fetchedUsers;
      return newState;
    }
    case SET_IS_AUTHENTIFICATED: {
      const newState = { ...state };
      newState.isAuthentificated = action.isAuthentificated;
      return newState;
    }
    case SET_IS_FETCHING: {
      const newState      = { ...state };
      newState.isFetching = action.isFetching;
      return newState;
    }
    case SET_PAGE_PARAMS: {
      const newState      = { ...state };
      newState.pageParams = { ...state.pageParams, ...action.pageParams };
      return newState;
    }
    default: return state;
  }
};

export const follow = (userId) => ({
  type: FOLLOW, userId
});

export const unfollow = (userId) => ({
  type: UNFOLLOW, userId
});

export const setFetchedUsers = (fetchedUsers) => ({
  type: SET_FETCHED_USERS, fetchedUsers
});

export const setIsAuthentificated = (isAuthentificated) => ({
  type: SET_IS_AUTHENTIFICATED, isAuthentificated
});

export const setIsFetching = (isFetching) => ({
  type: SET_IS_FETCHING, isFetching
});

export const setPageParams = (pageParams) => ({
  type: SET_PAGE_PARAMS, pageParams
});

export default usersReducer;