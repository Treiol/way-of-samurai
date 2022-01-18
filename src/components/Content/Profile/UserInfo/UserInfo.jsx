import React from 'react';
import style from './UserInfo.module.css';

class UserInfo extends React.Component {
  // ---------------------------------------------------
  state = { editMode: false }
  // ---------------------------------------------------
  setEditMode = (value) => {
    console.log(this);
    this.setState({ editMode: value });
  }
  // ---------------------------------------------------
  render() {
    const userInfo = [];
    if (!this.props.userInfo) {
      userInfo.push(<span key="userInfo">user info</span>);
    } else {
      const aboutMe = (this.state.editMode)
        ? <input
            id="aboutMe" type="text" placeholder="Обо мне" value={this.props.userInfo.about_me}
            autoFocus={true}
            onBlur={() => { this.setEditMode(false); }}
          />
        : this.props.userInfo.about_me;
      userInfo.push(<div key="userAvatar" className={style.userAvatar}><span>ava</span></div>);
      userInfo.push(
        <div key="userData" className={style.userData}>
          <span className={style.name}>{this.props.userInfo.name}</span>
          <span className={style.aboutMe} onClick={() => { this.setEditMode(true); }}>{aboutMe}</span>
        </div>
      );
    }
    return (<div className={style.userInfo}>{userInfo}</div>);
  }
  // ---------------------------------------------------
};

export default UserInfo;