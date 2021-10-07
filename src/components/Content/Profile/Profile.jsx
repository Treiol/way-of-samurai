import { createRef } from 'react';
import style from './Profile.module.css';

const Profile = (props) => {
  const textareaPost = createRef();
  return (
    <div className={`content ${style.content} ${style.profile}`}>
      <div className={style.userInfo}><span>user info</span></div>
      <div className={style.userPosts}>
        <div className={style.postForm}>
          <h1>Новая запись</h1>
          <textarea ref={textareaPost}></textarea>
          <input type="button" value="Добавить" />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;