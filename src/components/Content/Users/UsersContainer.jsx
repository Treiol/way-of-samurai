import React         from 'react';
import { connect }   from 'react-redux';
import { followApi } from '../../../api/api';
import { setIsAuthentificated } from '../../../redux/auth-reducer';
import {
  fetchUsers, follow, unfollow, setFollowingInProgress, setIsFetching, setPageParams
} from '../../../redux/users-reducer';
import Users from './Users';

class UsersApi extends React.Component {
  // ---------------------------------------------------
  _followUser(userId) {
    this.props.setFollowingInProgress(userId, true);
    followApi.postFollow(userId).then(
      (data) => {
        this.props.setFollowingInProgress(userId, false);
        if (!data) { return; }
        if (data.status < 0) {
          switch (data.status) {
            case -4:
            case -10:
              alert('Аутентифицируйтесь, чтобы подписаться на пользователя!');
              console.warn(`Follow API: ${data.status} ${data.message}`);
              if (this.props.isAuthentificated) { this.props.setIsAuthentificated(false); }
              break;
            default:
              alert('Не удалось подписаться на пользователя!');
              console.error(`Follow API: ${data.status} ${data.message}`);
          }
          return;
        }
        this.props.follow(userId);
      }
    );
  }
  // ---------------------------------------------------
  _unfollowUser(userId) {
    this.props.setFollowingInProgress(userId, true);
    followApi.deleteFollow(userId).then(
      (data) => {
        this.props.setFollowingInProgress(userId, false);
        if (!data) { return; }
        if (data.status < 0) {
          switch (data.status) {
            case -4:
            case -10:
              alert('Аутентифицируйтесь, чтобы отписаться от пользователя!');
              console.warn(`Follow API: ${data.status} ${data.message}`);
              if (this.props.isAuthentificated) { this.props.setIsAuthentificated(false); }
              break;
            default:
              alert('Не удалось отписаться от пользователя!');
              console.error(`Follow API: ${data.status} ${data.message}`);
          }
          return;
        }
        this.props.unfollow(userId);
      }
    );
  }
  // ---------------------------------------------------
  componentDidMount() {
    const authentification = {
      isAuthentificated:    this.props.isAuthentificated,
      setIsAuthentificated: this.props.setIsAuthentificated
    };
    this.props.fetchUsers(authentification, this.props.pageParams,
      (data) => {
        this.props.setPageParams({
          pagesCount: Math.ceil(data.total_count / this.props.pageParams.pageSize)
        });
      }
    );
  }
  // ---------------------------------------------------
  render() {
    return (
      <Users
        fetchedUsers={this.props.fetchedUsers} followingInProgress={this.props.followingInProgress}
        isAuthentificated={this.props.isAuthentificated} isFetching={this.props.isFetching}
        pageParams={this.props.pageParams}
        fetchUsers={this.props.fetchUsers.bind(this)} follow={this._followUser.bind(this)}
        unfollow={this._unfollowUser.bind(this)} setIsAuthentificated={this.props.setIsAuthentificated}
        setPageParams={this.props.setPageParams}
      />
    );
  }
  // ---------------------------------------------------
};

const mapStateToProps = (state) => ({
  fetchedUsers:        state.usersData.fetchedUsers,
  isAuthentificated:   state.authData.isAuthentificated,
  isFetching:          state.usersData.isFetching,
  followingInProgress: state.usersData.followingInProgress,
  pageParams:          state.usersData.pageParams
});

const actions = {
  fetchUsers, follow, unfollow, setFollowingInProgress, setIsAuthentificated,
  setIsFetching, setPageParams
};

export default connect(mapStateToProps, actions)(UsersApi);