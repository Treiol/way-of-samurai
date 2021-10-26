import style    from './Profile.module.css';
import Post     from './Post/Post';
import UserInfo from './UserInfo/UserInfo';

const Profile = (props) => {
  if (props.isFetching) {
    return (
      <div className={style.isFetching}><span>Запрос информации о пользователе...</span></div>
    );
  }
  // ---------------------------------------------------
  const addPostClick = (postText) => {
    if (postText.trim() === '') {
      alert('Введите текст записи!');
      return;
    }
    props.addPost();
  };
  // ---------------------------------------------------
  const posts = props.posts.map(
    (post) => <Post key={`post${post.id}`} message={post.message} likesCount={post.likesCount} />
  );
  return (
    <div className={`content ${style.content} ${style.profile}`}>
      <UserInfo userInfo={props.userInfo} />
      <div className={style.userPosts}>
        <div className={style.postForm}>
          <h1>Новая запись</h1>
          <textarea
            value={props.newPostText}
            onChange={(event) => { props.updateNewPostText(event.target.value); }}
          />
          <input
            type="button" value="Добавить"
            onClick={() => { addPostClick(props.newPostText); }}
          />
        </div>
        <div className={style.postList}>{posts}</div>
      </div>
    </div>
  );
};

export default Profile;