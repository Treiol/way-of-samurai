import { profileApi } from '../api/api';

const ADD_POST             = 'ADD_POST';
const SET_IS_FETCHING      = 'SET_IS_FETCHING';
const SET_USER_INFO        = 'SET_USER_INFO';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

const INITIAL_STATE = {
  isFetching:  false,
  newPostText: '',
  posts:       [],
  userInfo:    null
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_POST: {
      const newState = { ...state };
      newState.posts = [
        {
          id:         state.posts.length + 1,
          message:    state.newPostText,
          likesCount: 0
        },
        ...state.posts
      ];
      newState.newPostText = '';
      return newState;
    }
    case SET_IS_FETCHING: {
      const newState      = { ...state };
      newState.isFetching = action.isFetching;
      return newState;
    }
    case SET_USER_INFO: {
      const newState    = { ...state };
      newState.userInfo = action.userInfo;
      return newState;
    }
    case UPDATE_NEW_POST_TEXT: {
      const newState = { ...state };
      newState.newPostText = action.newPostText;
      return newState;
    }
    default: return state;
  }
};

export const addPost = () => ({
  type: ADD_POST
});

export const fetchProfile = (userId) => (dispatch) => {
  // ---------------------------------------------------
  const setIsFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching });
  const setUserInfo   = (userInfo)   => ({ type: SET_USER_INFO,   userInfo });  
  // ---------------------------------------------------
  dispatch(setIsFetching(true));
  profileApi.getProfile(userId).then(
    (data) => {
      dispatch(setIsFetching(false));
      if (!data) { return; }
      if (data.status < 0) {
        console.error(`Profile API: ${data.status} ${data.error}`);
        return;
      }
      dispatch(setUserInfo(data.profile));
    }
  );
};

export const updateNewPostText = (newPostText) => ({
  type: UPDATE_NEW_POST_TEXT, newPostText
});

export default profileReducer;