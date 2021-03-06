import { NavLink } from 'react-router-dom';
import style from './User.module.css';

const User = (props) => {
  const followUnfollow = (!props.followed)
    ? <input
        className={style.follow} type="button" value="Подписаться"
        disabled={props.followingInProgress.some(userId => userId === props.id)}
        onClick={() => { props.followClick(props.id); }}
      />
    : <input
        className={style.unfollow} type="button" value="Отписаться"
        disabled={props.followingInProgress.some(userId => userId === props.id)}
        onClick={() => { props.unfollowClick(props.id); }}
      />;
  return (
    <div className={style.user}>
      <div className={style.userAvatar}><span>ava</span></div>
      <div className={style.userName}>
        <NavLink to={`/profile/${props.id}`}>{props.name}</NavLink>
        {followUnfollow}
      </div>
    </div>
  );
};

export default User;