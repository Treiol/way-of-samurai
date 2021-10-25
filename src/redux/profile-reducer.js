const ADD_POST             = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

const INITIAL_STATE = {
  newPostText: '',
  posts:       []
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

export const updateNewPostText = (newPostText) => ({
  type: UPDATE_NEW_POST_TEXT, newPostText
});

export default profileReducer;