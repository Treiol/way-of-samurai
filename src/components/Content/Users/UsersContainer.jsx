import { connect } from 'react-redux';
import {
  follow, unfollow, setFetchedUsers, setIsFetching, setPageParams
} from '../../../redux/users-reducer';
import Users from './Users';

const mapStateToProps = (state) => ({
  fetchedUsers: state.usersData.fetchedUsers,
  isFetching:   state.usersData.isFetching,
  pageParams:   state.usersData.pageParams
});

const actions = { follow, unfollow, setFetchedUsers, setIsFetching, setPageParams };

export default connect(mapStateToProps, actions)(Users);