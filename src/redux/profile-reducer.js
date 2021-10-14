const ACTION_ADD_POST             = 'ACTION_ADD_POST';
const ACTION_UPDATE_NEW_POST_TEXT = 'ACTION_UPDATE_NEW_POST_TEXT';

const profileReducer = (state, action) => {
  switch (action.type) {
    case ACTION_ADD_POST:
      state.posts.unshift({
        id:         state.posts.length + 1,
        message:    state.newPostText,
        likesCount: 0
      });
      state.newPostText = '';
      return state;
    case ACTION_UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newPostText;
      return state;
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({
  type: ACTION_ADD_POST
});

export const updateNewPostTextActionCreator = (newPostText) => ({
  type: ACTION_UPDATE_NEW_POST_TEXT, newPostText
});

export default profileReducer;