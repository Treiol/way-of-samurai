import style from './UserInfo.module.css';

const UserInfo = (props) => {
  const userInfo = [];
  if (!props.userInfo) {
    userInfo.push(<span key="userInfo">user info</span>);
  } else {
    userInfo.push(<div key="userAvatar" className={style.userAvatar}><span>ava</span></div>);
    userInfo.push(
      <div key="userData" className={style.userData}>
        <span className={style.name}>{props.userInfo.name}</span>
        <span className={style.aboutMe}>{props.userInfo.about_me}</span>
      </div>
    );
  }
  return (
    <div className={style.userInfo}>{userInfo}</div>
  );
};

export default UserInfo;