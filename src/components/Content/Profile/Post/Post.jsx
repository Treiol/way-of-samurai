import style from './Post.module.css';

const Post = (props) => {
  return (
    <div className={style.post}>
      <div className={style.messageContainer}>
        <div className={style.userAvatar}><span>ava</span></div>
        <div className={style.message}>{props.message}</div>
      </div>
      <div className={style.likesCount}>Количество лайков: {props.likesCount}</div>
    </div>
  );
};

export default Post;