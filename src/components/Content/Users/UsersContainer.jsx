import { connect } from 'react-redux';
import { acFollow, acUnfollow, acSetUsers } from '../../../redux/users-reducer';
import Users from './Users';

const mapStateToProps = (state) => {
  return {
    users: state.usersData.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFollowClick: (userId) => {
      dispatch(acFollow(userId));
    },
    onUnfollowClick: (userId) => {
      dispatch(acUnfollow(userId));
    },
    onSetUsers: (users) => {
      dispatch(acSetUsers(users));
    }
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;