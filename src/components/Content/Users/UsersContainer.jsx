import React       from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { fetchUsers, followUser, unfollowUser, setPageParams } from '../../../redux/users-reducer';
import { withAuthRedirect } from '../../withAuthRedirect';
import Placeholder          from '../Placeholder';
import Users                from './Users';

const actions = { fetchUsers, followUser, unfollowUser, setPageParams };

const mapStateToProps = (state) => ({
  fetchedUsers:        state.usersData.fetchedUsers,
  followingInProgress: state.usersData.followingInProgress,
  isFetching:          state.usersData.isFetching,
  pageParams:          state.usersData.pageParams
});

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
    if (this.props.isFetching) { return (<Placeholder message="Запрос пользователей..." />); }
    return (
      <Users
        fetchedUsers={this.props.fetchedUsers} followingInProgress={this.props.followingInProgress}
        pageParams={this.props.pageParams}
        fetchUsers={this.props.fetchUsers.bind(this)} follow={this.props.followUser.bind(this)}
        unfollow={this.props.unfollowUser.bind(this)} setPageParams={this.props.setPageParams}
      />
    );
  }
  // ---------------------------------------------------
};

const UsersContainer = compose(
  connect(mapStateToProps, actions),
  withAuthRedirect
)(UsersApi);

export default UsersContainer;