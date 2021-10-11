import style from './Profile.module.css';
import Post  from './Post/Post';

const Profile = (props) => {
  // ---------------------------------------------------
  const addPostClick = () => {
    if (props.store.getState().profileData.newPostText.trim() === '') {
      alert('Текст записи не может быть пустым!');
      return;
    }
    props.store.addPost();
  };
  // ---------------------------------------------------
  const posts = props.store.getState().profileData.posts.map(
    (post) => <Post message={post.message} likesCount={post.likesCount} />
  );
  return (
    <div className={`content ${style.content} ${style.profile}`}>
      <div className={style.userInfo}><span>user info</span></div>
      <div className={style.userPosts}>
        <div className={style.postForm}>
          <h1>Новая запись</h1>
          <textarea value={props.store.getState().profileData.newPostText}
            onChange={(sender) => { props.store.updateNewPostText(sender.target.value); }}
          />
          <input type="button" value="Добавить" onClick={addPostClick} />
        </div>
        <div className={style.postList}>{posts}</div>
      </div>
    </div>
  );
};

export default Profile;