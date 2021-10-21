const ACTION_ADD_POST             = 'ACTION_ADD_POST';
const ACTION_UPDATE_NEW_POST_TEXT = 'ACTION_UPDATE_NEW_POST_TEXT';

const INITIAL_STATE = {
  newPostText: '',
  posts:       []
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_ADD_POST: {
      const newState = { ...state };
      newState.posts = [{
        id:         state.posts.length + 1,
        message:    state.newPostText,
        likesCount: 0
      }, ...state.posts];
      newState.newPostText = '';
      return newState;
    }
    case ACTION_UPDATE_NEW_POST_TEXT: {
      const newState = { ...state };
      newState.newPostText = action.newPostText;
      return newState;
    }
    default: return state;
  }
};

export const acAddPost = () => ({
  type: ACTION_ADD_POST
});

export const acUpdateNewPostText = (newPostText) => ({
  type: ACTION_UPDATE_NEW_POST_TEXT, newPostText
});

export default profileReducer;