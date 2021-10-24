import React from 'react';
import Axios from 'axios';
import style from './Users.module.css';
import User  from './User/User';
import PageControl from './PageControl/PageControl';

class Users extends React.Component {
  // ---------------------------------------------------
  componentDidMount() {
    const currentPage = this.props.pageParams.currentPage;
    const pageSize    = this.props.pageParams.pageSize;
    Axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${currentPage}`).then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Failed to get users:\n${response.status} ${response.statusText}`);
          return;
        }
        this.props.onSetFetchedUsers(response.data.items);
        this.props.onSetPageParams({ pagesCount: Math.ceil(response.data.totalCount / pageSize) });
      }
    );
  }
  // ---------------------------------------------------
  render() {
    const users = this.props.fetchedUsers.map(
      (user) =>
        <User
          id={user.id} key={`user${user.id}`} name={user.name} photos={user.photos}
          status={user.status} url={user.uniqueUrlName} followed={user.followed}
          onFollowClick={this.props.onFollowClick} onUnfollowClick={this.props.onUnfollowClick}
        />
    );
    return (
      <div className={`${style.content} ${style.users}`}>
        <div className={style.userList}>{users}</div>
        <PageControl
          currentPage={this.props.pageParams.currentPage}
          pageSize={this.props.pageSize} pagesCount={this.props.pageParams.pagesCount}
          onSetFetchedUsers={this.props.onSetFetchedUsers} onSetPageParams={this.props.onSetPageParams}
        />
      </div>
    );
  }
  // ---------------------------------------------------
};

export default Users;