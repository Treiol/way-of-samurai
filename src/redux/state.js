const state = {
  dialogsData: { },
  feedData:    { },
  profileData: {
    posts: []
  }
};

export const addPost = (message) => {
  const newPost = {
    id: state.profileData.posts.length + 1, message, likesCount: 0
  };
  state.profileData.posts.push(newPost);
};

export default state;