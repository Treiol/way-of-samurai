import style from './UserInfo.module.css';

const UserInfo = (props) => {
  const userInfo = [];
  if (!Object.keys(props.userInfo).length) {
    userInfo.push(<span key="userInfo">user info</span>);
  } else {
    userInfo.push(<div key="userAvatar" className={style.userAvatar}><span>ava</span></div>);
    userInfo.push(
      <div key="userData" className={style.userData}>
        <span className={style.fullName}>{props.userInfo.fullName}</span>
        <span className={style.aboutMe}>{props.userInfo.aboutMe}</span>
      </div>
    );
  }
  return (
    <div className={style.userInfo}>{userInfo}</div>
  );
};

export default UserInfo;