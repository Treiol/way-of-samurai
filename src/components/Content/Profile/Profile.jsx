import style from './Profile.module.css';
import Post  from './Post/Post';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/state';

const Profile = (props) => {
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
  const posts = props.data.posts.map(
    (post) =>
      <Post key={`post${post.id}`} message={post.message} likesCount={post.likesCount} />
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