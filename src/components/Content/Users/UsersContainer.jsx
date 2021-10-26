import React       from 'react';
import { connect } from 'react-redux';
import Axios       from 'axios';
import {
  follow, unfollow, setFetchedUsers, setIsFetching, setPageParams
} from '../../../redux/users-reducer';
import Users from './Users';

class UsersApi extends React.Component {
  // ---------------------------------------------------
  _fetchUsers(currentPage, pageSize, afterSetFetchedUsers = null) {
    this.props.setIsFetching(true);
    Axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${pageSize}&page=${currentPage}`).then(
      (response) => {
        this.props.setIsFetching(false);
        if (response.status >= 400) {
          console.error(`Failed to get users:\n${response.status} ${response.statusText}`);
          return;
        }
        this.props.setFetchedUsers(response.data.items);
        if (afterSetFetchedUsers) { afterSetFetchedUsers(response.data); }
      }
    );
  }
  // ---------------------------------------------------
  componentDidMount() {
    this._fetchUsers(this.props.pageParams.currentPage, this.props.pageParams.pageSize,
      (responseData) => {
        this.props.setPageParams({
          pagesCount: Math.ceil(responseData.totalCount / this.props.pageParams.pageSize)
        });
      }
    );
  }
  // ---------------------------------------------------
  render() {
    return (
      <Users
        fetchedUsers={this.props.fetchedUsers} isFetching={this.props.isFetching}
        pageParams={this.props.pageParams}
        fetchUsers={this._fetchUsers.bind(this)} follow={this.props.follow}
        unfollow={this.props.unfollow} setPageParams={this.props.setPageParams}
      />
    );
  }
  // ---------------------------------------------------
};

const mapStateToProps = (state) => ({
  fetchedUsers: state.usersData.fetchedUsers,
  isFetching:   state.usersData.isFetching,
  pageParams:   state.usersData.pageParams
});

const actions = { follow, unfollow, setFetchedUsers, setIsFetching, setPageParams };

export default connect(mapStateToProps, actions)(UsersApi);