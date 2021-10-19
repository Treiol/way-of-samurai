const ACTION_ADD_POST             = 'ACTION_ADD_POST';
const ACTION_UPDATE_NEW_POST_TEXT = 'ACTION_UPDATE_NEW_POST_TEXT';

const initialState = {
  newPostText: '',
  posts:       []
};

const profileReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_ADD_POST:
      newState.posts = [{
        id:         state.posts.length + 1,
        message:    state.newPostText,
        likesCount: 0
      }, ...state.posts];
      newState.newPostText = '';
      return newState;
    case ACTION_UPDATE_NEW_POST_TEXT:
      newState.newPostText = action.newPostText;
      return newState;
    default:
      return newState;
  }
};

export const addPostActionCreator = () => ({
  type: ACTION_ADD_POST
});

export const updateNewPostTextActionCreator = (newPostText) => ({
  type: ACTION_UPDATE_NEW_POST_TEXT, newPostText
});

export default profileReducer;