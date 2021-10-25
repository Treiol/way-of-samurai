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
    this.props.setIsFetching(true);
    Axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${currentPage}`).then(
      (response) => {
        this.props.setIsFetching(false);
        if (response.status >= 400) {
          console.error(`Failed to get users:\n${response.status} ${response.statusText}`);
          return;
        }
        this.props.setFetchedUsers(response.data.items);
        this.props.setPageParams({ pagesCount: Math.ceil(response.data.totalCount / pageSize) });
      }
    );
  }
  // ---------------------------------------------------
  render() {
    if (this.props.isFetching) {
      return (<div className={style.isFetching}><span>Запрос пользователей...</span></div>);
    }
    const users = this.props.fetchedUsers.map(
      (user) =>
        <User
          id={user.id} key={`user${user.id}`} name={user.name} photos={user.photos}
          status={user.status} url={user.uniqueUrlName} followed={user.followed}
          onFollowClick={this.props.follow} onUnfollowClick={this.props.unfollow}
        />
    );
    return (
      <div className={`${style.content} ${style.users}`}>
        <div className={style.userList}>{users}</div>
        <PageControl
          currentPage={this.props.pageParams.currentPage}
          pageSize={this.props.pageParams.pageSize} pagesCount={this.props.pageParams.pagesCount}
          onSetFetchedUsers={this.props.setFetchedUsers} onSetIsFetching={this.props.setIsFetching}
          onSetPageParams={this.props.setPageParams}
        />
      </div>
    );
  }
  // ---------------------------------------------------
};

export default Users;