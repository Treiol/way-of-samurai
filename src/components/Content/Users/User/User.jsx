import style from './User.module.css';

const User = (props) => {
  const followUnfollow = (!props.followed)
    ? <input
        className={style.follow} type="button" value="Добавить в друзья"
        onClick={() => { props.onFollowClick(props.id); }}
      />
    : <input
        className={style.unfollow} type="button" value="Удалить из друзей"
        onClick={() => { props.onUnfollowClick(props.id); }}
      />;
  return (
    <div className={style.user}>
      <div className={style.userAvatar}><span>ava</span></div>
      <div className={style.userName}>
        <span>{props.name}</span>
        {followUnfollow}
      </div>
    </div>
  );
};

export default User;