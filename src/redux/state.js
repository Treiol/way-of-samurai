const store = {
  _state: {
    dialogsData: { },
    feedData:    { },
    profileData: {
      newPostText: '',
      posts:       []
    }
  },
  _rerenderEntireTree() { },
  addPost() {
    const newPost = {
      id:         this._state.profileData.posts.length + 1,
      message:    this._state.profileData.newPostText,
      likesCount: 0
    };
    this._state.profileData.posts.unshift(newPost);
    this._state.profileData.newPostText = '';
    this._rerenderEntireTree(this);
  },
  getState() {
    return this._state;
  },
  subcribe(observer) {
    this._rerenderEntireTree = observer;
  },
  updateNewPostText(newPostText) {
    this._state.profileData.newPostText = newPostText;
    this._rerenderEntireTree(this);
  }
};

export default store;