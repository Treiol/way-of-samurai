import { rerenderEntireTree } from '../render';

const state = {
  dialogsData: { },
  feedData:    { },
  profileData: {
    newPostText: '',
    posts:       []
  }
};

export const addPost = () => {
  const newPost = {
    id:         state.profileData.posts.length + 1,
    message:    state.profileData.newPostText,
    likesCount: 0
  };
  state.profileData.posts.unshift(newPost);
  state.profileData.newPostText = '';
  rerenderEntireTree(state, addPost, updateNewPostText);
};

export const updateNewPostText = (newPostText) => {
  state.profileData.newPostText = newPostText;
  rerenderEntireTree(state, addPost, updateNewPostText);
};

export default state;