import { usersApi } from '../api/api';

const FOLLOW                    = 'FOLLOW';
const UNFOLLOW                  = 'UNFOLLOW';
const SET_FETCHED_USERS         = 'SET_FETCHED_USERS';
const SET_FOLLOWING_IN_PROGRESS = 'SET_FOLLOWING_IN_PROGRESS';
const SET_IS_FETCHING           = 'SET_IS_FETCHING';
const SET_PAGE_PARAMS           = 'SET_PAGE_PARAMS';

const INITIAL_STATE = {
  fetchedUsers:        [],
  followingInProgress: [],
  isFetching:          false,
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
    case SET_FOLLOWING_IN_PROGRESS: {
      const newState = { ...state };
      newState.followingInProgress = action.isInProgress
        ? [...state.followingInProgress, action.userId]
        : state.followingInProgress.filter(userId => userId !== action.userId);
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

export const fetchUsers = (authObj, pageParams, afterUsersFetched) => (dispatch) => {
  dispatch(setIsFetching(true));
  usersApi.getUsers(pageParams.currentPage, pageParams.pageSize).then(
    (data) => {
      dispatch(setIsFetching(false));
      if (!data) { return; }
      if (data.status < 0) {
        switch (data.status) {
          case -4:
          case -10:
            console.warn(`Users API: ${data.status} ${data.message}`);
            if (authObj.isAuthentificated) { dispatch(authObj.setIsAuthentificated(false)); }
            break;
          default:
            alert('Не удалось получить список пользователей!');
            console.error(`Users API: ${data.status} ${data.message}`);
        }
        return;
      }
      dispatch(setFetchedUsers(data.users));
      if (afterUsersFetched) { afterUsersFetched(data); }
    }
  );
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

export const setFollowingInProgress = (userId, isInProgress) => ({
  type: SET_FOLLOWING_IN_PROGRESS, userId, isInProgress
});

export const setIsFetching = (isFetching) => ({
  type: SET_IS_FETCHING, isFetching
});

export const setPageParams = (pageParams) => ({
  type: SET_PAGE_PARAMS, pageParams
});

export default usersReducer;