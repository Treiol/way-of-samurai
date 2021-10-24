import { connect } from 'react-redux';
import {
  acFollow, acUnfollow, acSetFetchedUsers, acSetPageParams
} from '../../../redux/users-reducer';
import Users from './Users';

const mapStateToProps = (state) => ({
  fetchedUsers: state.usersData.fetchedUsers,
  pageParams:   state.usersData.pageParams
});

const mapDispatchToProps = (dispatch) => ({
  onFollowClick: (userId) => {
    dispatch(acFollow(userId));
  },
  onUnfollowClick: (userId) => {
    dispatch(acUnfollow(userId));
  },
  onSetFetchedUsers: (fetchedUsers) => {
    dispatch(acSetFetchedUsers(fetchedUsers));
  },
  onSetPageParams: (pageParams) => {
    dispatch(acSetPageParams(pageParams));
  }
});

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;