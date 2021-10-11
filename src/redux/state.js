const store = {
  _state: {
    dialogsData: { },
    feedData:    { },
    profileData: {
      newPostText: '',
      posts:       []
    }
  },
  _callSubscriber() { },
  addPost() {
    const newPost = {
      id:         this._state.profileData.posts.length + 1,
      message:    this._state.profileData.newPostText,
      likesCount: 0
    };
    this._state.profileData.posts.unshift(newPost);
    this._state.profileData.newPostText = '';
    this._callSubscriber(this);
  },
  getState() {
    return this._state;
  },
  subcribe(observer) {
    this._callSubscriber = observer;
  },
  updateNewPostText(newPostText) {
    this._state.profileData.newPostText = newPostText;
    this._callSubscriber(this);
  }
};

export default store;