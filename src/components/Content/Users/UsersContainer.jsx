import React       from 'react';
import { connect } from 'react-redux';
import { followApi, usersApi }  from '../../../api/api';
import { setIsAuthentificated } from '../../../redux/auth-reducer';
import {
  follow, unfollow, setFetchedUsers, setIsFetching, setPageParams
} from '../../../redux/users-reducer';
import Users from './Users';

class UsersApi extends React.Component {
  // ---------------------------------------------------
  _fetchUsers(currentPage, pageSize, afterSetFetchedUsers = null) {
    this.props.setIsFetching(true);
    usersApi.getUsers(currentPage, pageSize).then(
      (data) => {
        this.props.setIsFetching(false);
        if (!data) { return; }
        if (data.status < 0) {
          switch (data.status) {
            case -4:
            case -10:
              console.warn(`Users API: ${data.status} ${data.message}`);
              if (this.props.isAuthentificated) { this.props.setIsAuthentificated(false); }
              break;
            default:
              alert('Не удалось получить список пользователей!');
              console.error(`Users API: ${data.status} ${data.message}`);
          }
          return;
        }
        this.props.setFetchedUsers(data.users);
        if (afterSetFetchedUsers) { afterSetFetchedUsers(data); }
      }
    );
  }
  // ---------------------------------------------------
  _followUser(userId) {
    followApi.postFollow(userId).then(
      (data) => {
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
    followApi.deleteFollow(userId).then(
      (data) => {
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
    this._fetchUsers(this.props.pageParams.currentPage, this.props.pageParams.pageSize,
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
        fetchedUsers={this.props.fetchedUsers} isAuthentificated={this.props.isAuthentificated}
        isFetching={this.props.isFetching} pageParams={this.props.pageParams}
        fetchUsers={this._fetchUsers.bind(this)} follow={this._followUser.bind(this)}
        unfollow={this._unfollowUser.bind(this)} setPageParams={this.props.setPageParams}
      />
    );
  }
  // ---------------------------------------------------
};

const mapStateToProps = (state) => ({
  fetchedUsers:      state.usersData.fetchedUsers,
  isAuthentificated: state.authData.isAuthentificated,
  isFetching:        state.usersData.isFetching,
  pageParams:        state.usersData.pageParams
});

const actions = {
  follow, unfollow, setFetchedUsers, setIsAuthentificated, setIsFetching, setPageParams
};

export default connect(mapStateToProps, actions)(UsersApi);