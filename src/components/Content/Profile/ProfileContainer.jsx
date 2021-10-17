import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import Profile from './Profile';

const ProfileContainer = (props) => {
  // ---------------------------------------------------
  const addPostClick = () => {
    if (props.data.newPostText.trim() === '') {
      alert('Текст записи не может быть пустым!');
      return;
    }
    const action = addPostActionCreator();
    props.onDispatch(action);
  };
  // ---------------------------------------------------
  const postTextChange = (value) => {
    const action = updateNewPostTextActionCreator(value);
    props.onDispatch(action);
  };
  // ---------------------------------------------------
  return (
    <Profile
      newPostText={props.data.newPostText} posts={props.data.posts}
      onAddPostClick={addPostClick} onPostTextChange={postTextChange}
    />
  );
};

export default ProfileContainer;