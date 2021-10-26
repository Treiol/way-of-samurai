const ADD_POST             = 'ADD_POST';
const SET_IS_FETCHING      = 'SET_IS_FETCHING';
const SET_USER_INFO        = 'SET_USER_INFO';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

const INITIAL_STATE = {
  isFetching:  false,
  newPostText: '',
  posts:       [],
  userInfo:    { }
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_POST: {
      const newState = { ...state };
      newState.posts = [{
        id:         state.posts.length + 1,
        message:    state.newPostText,
        likesCount: 0
      }, ...state.posts];
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

export const setIsFetching = (isFetching) => ({
  type: SET_IS_FETCHING, isFetching
});

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO, userInfo
});

export const updateNewPostText = (newPostText) => ({
  type: UPDATE_NEW_POST_TEXT, newPostText
});

export default profileReducer;