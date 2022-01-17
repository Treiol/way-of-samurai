import { followApi, usersApi }  from '../api/api';

const ACCEPT_FOLLOW             = 'ACCEPT_FOLLOW';
const ACCEPT_UNFOLLOW           = 'ACCEPT_UNFOLLOW';
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
    case ACCEPT_FOLLOW: {
      const newState = { ...state };
      newState.fetchedUsers = state.fetchedUsers.map(
        (fetchedUser) => {
          if (fetchedUser.id === action.userId) { fetchedUser.is_followed = true; }
          return fetchedUser;
        }
      );
      return newState;
    }
    case ACCEPT_UNFOLLOW: {
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

const setFollowingInProgress = (userId, isInProgress) => ({
  type: SET_FOLLOWING_IN_PROGRESS, userId, isInProgress
});

export const fetchUsers = (pageParams, afterUsersFetched) => (dispatch) => {
  // ---------------------------------------------------
  const setFetchedUsers = (fetchedUsers) => ({ type: SET_FETCHED_USERS, fetchedUsers });
  const setIsFetching   = (isFetching)   => ({ type: SET_IS_FETCHING,   isFetching });
  // ---------------------------------------------------
  dispatch(setIsFetching(true));
  usersApi.getUsers(pageParams.currentPage, pageParams.pageSize).then(
    (data) => {
      dispatch(setIsFetching(false));
      if (!data) { return; }
      if (data.status < 0) {
        console.error(`Users API: ${data.status} ${data.message}`);
        return;
      }
      dispatch(setFetchedUsers(data.users));
      if (afterUsersFetched) { afterUsersFetched(data); }
    }
  );
};

export const followUser = (userId) => (dispatch) => {
  // ---------------------------------------------------
  const acceptFollow = (userId) => ({ type: ACCEPT_FOLLOW, userId });
  // ---------------------------------------------------
  dispatch(setFollowingInProgress(userId, true));
  followApi.postFollow(userId).then(
    (data) => {
      dispatch(setFollowingInProgress(userId, false));
      if (!data) { return; }
      if (data.status < 0) {
        console.error(`Follow API: ${data.status} ${data.message}`);
        return;
      }
      dispatch(acceptFollow(userId));
    }
  );
};

export const unfollowUser = (userId) => (dispatch) => {
  // ---------------------------------------------------
  const acceptUnfollow = (userId) => ({ type: ACCEPT_UNFOLLOW, userId });  
  // ---------------------------------------------------
  dispatch(setFollowingInProgress(userId, true));
  followApi.deleteFollow(userId).then(
    (data) => {
      dispatch(setFollowingInProgress(userId, false));
      if (!data) { return; }
      if (data.status < 0) {
        console.error(`Follow API: ${data.status} ${data.message}`);
        return;
      }
      dispatch(acceptUnfollow(userId));
    }
  );
};

export const setPageParams = (pageParams) => ({
  type: SET_PAGE_PARAMS, pageParams
});

export default usersReducer;