import React from 'react';
import Axios from 'axios';
import style from './Users.module.css';
import User  from './User/User';

class Users extends React.Component {
  // ---------------------------------------------------
  componentDidMount() {
    if (this.props.users.length > 0) { return; }
    Axios.get('https://social-network.samuraijs.com/api/1.0/users').then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Failed to get users:\n${response.status} ${response.statusText}`);
          return;
        }
        this.props.onSetUsers(response.data.items);
      }
    );
  }
  // ---------------------------------------------------
  render() {
    const users = this.props.users.map(
      (user) =>
        <User
          id={user.id} key={`user${user.id}`} name={user.name} photos={user.photos}
          status={user.status} url={user.uniqueUrlName} followed={user.followed}
          onFollowClick={this.props.onFollowClick} onUnfollowClick={this.props.onUnfollowClick}
        />
    );
    return (
      <div className={`${style.content} ${style.users}`}>{users}</div>
    );
  }
  // ---------------------------------------------------
};

export default Users;