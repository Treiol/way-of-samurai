import style from './Profile.module.css';
import Post  from './Post/Post';
import { ACTION_ADD_POST, ACTION_UPDATE_NEW_POST_TEXT } from '../../../redux/state';

const Profile = (props) => {
  // ---------------------------------------------------
  const addPostClick = () => {
    if (props.data.newPostText.trim() === '') {
      alert('Текст записи не может быть пустым!');
      return;
    }
    props.onDispatch({ type: ACTION_ADD_POST });
  };
  // ---------------------------------------------------
  const postTextChange = (value) => {
    props.onDispatch({ type: ACTION_UPDATE_NEW_POST_TEXT, newPostText: value });
  };
  // ---------------------------------------------------
  const posts = props.data.posts.map(
    (post) => <Post message={post.message} likesCount={post.likesCount} />
  );
  return (
    <div className={`content ${style.content} ${style.profile}`}>
      <div className={style.userInfo}><span>user info</span></div>
      <div className={style.userPosts}>
        <div className={style.postForm}>
          <h1>Новая запись</h1>
          <textarea value={props.data.newPostText}
            onChange={(sender) => { postTextChange(sender.target.value); }}
          />
          <input type="button" value="Добавить" onClick={addPostClick} />
        </div>
        <div className={style.postList}>{posts}</div>
      </div>
    </div>
  );
};

export default Profile;