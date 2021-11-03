import React       from 'react';
import { connect } from 'react-redux';
import Axios       from 'axios';
import { setIsAuthentificated } from '../../../redux/auth-reducer';
import {
  follow, unfollow, setFetchedUsers, setIsFetching, setPageParams
} from '../../../redux/users-reducer';
import Users from './Users';

class UsersApi extends React.Component {
  // ---------------------------------------------------
  _fetchUsers(currentPage, pageSize, afterSetFetchedUsers = null) {
    this.props.setIsFetching(true);
    Axios.get(
      `https://treig.ddns.net:50005/users?count=${pageSize}&page=${currentPage}`,
      { withCredentials: true }
    ).then(
      (response) => {
        this.props.setIsFetching(false);
        if (response.status >= 400) {
          console.error(`Users API: ${response.status} ${response.statusText}`);
          return;
        }
        if (response.data.status < 0) {
          switch (response.data.status) {
            case -4:
            case -10:
              console.warn(`User API: ${response.data.status} ${response.data.message}`);
              if (this.props.isAuthentificated) { this.props.setIsAuthentificated(false); }
              break;
            default:
              alert('Не удалось получить список пользователей!');
              console.error(`User API: ${response.data.status} ${response.data.message}`);
          }
          return;
        }
        this.props.setFetchedUsers(response.data.users);
        if (afterSetFetchedUsers) { afterSetFetchedUsers(response.data); }
      }
    );
  }
  // ---------------------------------------------------
  _followUser(userId) {
    Axios.post(
      `https://treig.ddns.net:50005/follow/${userId}`, { }, { withCredentials: true }
    ).then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Follow API: ${response.status} ${response.statusText}`);
          return;
        }
        if (response.data.status < 0) {
          switch (response.data.status) {
            case -4:
            case -10:
              alert('Аутентифицируйтесь, чтобы подписаться на пользователя!');
              console.warn(`Follow API: ${response.data.status} ${response.data.message}`);
              if (this.props.isAuthentificated) { this.props.setIsAuthentificated(false); }
              break;
            default:
              alert('Не удалось подписаться на пользователя!');
              console.error(`Follow API: ${response.data.status} ${response.data.message}`);
          }
          return;
        }
        this.props.follow(userId);
      }
    );
  }
  // ---------------------------------------------------
  _unfollowUser(userId) {
    Axios.delete(
      `https://treig.ddns.net:50005/follow/${userId}`, { withCredentials: true }
    ).then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Follow API: ${response.status} ${response.statusText}`);
          return;
        }
        if (response.data.status < 0) {
          switch (response.data.status) {
            case -4:
            case -10:
              alert('Аутентифицируйтесь, чтобы отписаться от пользователя!');
              console.warn(`Follow API: ${response.data.status} ${response.data.message}`);
              if (this.props.isAuthentificated) { this.props.setIsAuthentificated(false); }
              break;
            default:
              alert('Не удалось отписаться от пользователя!');
              console.error(`Follow API: ${response.data.status} ${response.data.message}`);
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
      (responseData) => {
        this.props.setPageParams({
          pagesCount: Math.ceil(responseData.total_count / this.props.pageParams.pageSize)
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