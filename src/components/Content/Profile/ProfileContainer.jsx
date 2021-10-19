import { connect } from 'react-redux';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import Profile from './Profile';

const mapStateToProps = (state) => {
  return {
    newPostText: state.profileData.newPostText,
    posts:       state.profileData.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPostClick:   ()      => { dispatch(addPostActionCreator()); },
    onPostTextChange: (value) => { dispatch(updateNewPostTextActionCreator(value)); }
  };
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;