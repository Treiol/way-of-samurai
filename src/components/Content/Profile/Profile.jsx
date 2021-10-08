import { createRef } from 'react';
import style from './Profile.module.css';
import Post  from './Post/Post';

const Profile = (props) => {
  // ---------------------------------------------------
  const addPostClick = () => {
    props.addPost(textareaPost.current.value);
    textareaPost.current.value = '';
  };
  // ---------------------------------------------------
  const posts = props.state.profileData.posts.map(
    (post) => <Post message={post.message} likesCount={post.likesCount} />
  );
  const textareaPost = createRef();
  return (
    <div className={`content ${style.content} ${style.profile}`}>
      <div className={style.userInfo}><span>user info</span></div>
      <div className={style.userPosts}>
        <div className={style.postForm}>
          <h1>Новая запись</h1>
          <textarea ref={textareaPost}></textarea>
          <input type="button" value="Добавить" onClick={addPostClick} />
        </div>
        <div className={style.postList}>{posts}</div>
      </div>
    </div>
  );
};

export default Profile;