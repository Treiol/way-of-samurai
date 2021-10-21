import { connect } from 'react-redux';
import { acFollow, acUnfollow, acSetUsers } from '../../../redux/users-reducer';
//import Users from './Users';

const mapStateToProps = (state) => {
  return {
    users: state.usersData.users
  };
};

// ...