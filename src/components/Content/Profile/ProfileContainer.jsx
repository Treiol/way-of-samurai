import { connect } from 'react-redux';
import { addPost, updateNewPostText } from '../../../redux/profile-reducer';
import Profile from './Profile';

const mapStateToProps = (state) => ({
  newPostText: state.profileData.newPostText,
  posts:       state.profileData.posts
});

const actions = { addPost, updateNewPostText };

export default connect(mapStateToProps, actions)(Profile);