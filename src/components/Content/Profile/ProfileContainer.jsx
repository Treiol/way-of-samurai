import { connect } from 'react-redux';
import { acAddPost, acUpdateNewPostText } from '../../../redux/profile-reducer';
import Profile from './Profile';

const mapStateToProps = (state) => ({
  newPostText: state.profileData.newPostText,
  posts:       state.profileData.posts
});

const mapDispatchToProps = (dispatch) => ({
  onAddPostClick: () => {
    dispatch(acAddPost());
  },
  onPostTextChange: (value) => {
    dispatch(acUpdateNewPostText(value));
  }
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;