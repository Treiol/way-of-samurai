import style from './Profile.module.css';
import Post  from './Post/Post';

const Profile = (props) => {
  const posts = props.posts.map(
    (post) => <Post key={`post${post.id}`} message={post.message} likesCount={post.likesCount} />
  );
  return (
    <div className={`content ${style.content} ${style.profile}`}>
      <div className={style.userInfo}><span>user info</span></div>
      <div className={style.userPosts}>
        <div className={style.postForm}>
          <h1>Новая запись</h1>
          <textarea
            value={props.newPostText}
            onChange={(event) => { props.onPostTextChange(event.target.value); }}
          />
          <input type="button" value="Добавить" onClick={props.onAddPostClick} />
        </div>
        <div className={style.postList}>{posts}</div>
      </div>
    </div>
  );
};

export default Profile;