import React       from 'react';
import { connect } from 'react-redux';
import { fetchUsers, followUser, unfollowUser, setPageParams } from '../../../redux/users-reducer';
import Users from './Users';

class UsersApi extends React.Component {
  // ---------------------------------------------------
  componentDidMount() {
    this.props.fetchUsers(this.props.pageParams,
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
        fetchUsers={this.props.fetchUsers.bind(this)} follow={this.props.followUser.bind(this)}
        unfollow={this.props.unfollowUser.bind(this)} setPageParams={this.props.setPageParams}
      />
    );
  }
  // ---------------------------------------------------
};

const mapStateToProps = (state) => ({
  fetchedUsers:        state.usersData.fetchedUsers,
  followingInProgress: state.usersData.followingInProgress,
  isAuthentificated:   state.authData.isAuthentificated,
  isFetching:          state.usersData.isFetching,
  pageParams:          state.usersData.pageParams
});

const actions = { fetchUsers, followUser, unfollowUser, setPageParams };

export default connect(mapStateToProps, actions)(UsersApi);