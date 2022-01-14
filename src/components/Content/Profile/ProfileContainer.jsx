import React             from 'react';
import { connect }       from 'react-redux';
import { withRouter }    from 'react-router-dom';
import { fetchAuthData } from '../../../redux/auth-reducer';
import {
  addPost, fetchProfile, updateNewPostText
} from '../../../redux/profile-reducer';
import Profile from './Profile';

class ProfileApi extends React.Component {
  // ---------------------------------------------------
  componentDidMount() {
    this.props.fetchAuthData(false)
    const userId = (this.props.match.params.userId) ? parseInt(this.props.match.params.userId) : 0;
    this.props.fetchProfile(userId);
  }
  // ---------------------------------------------------
  render() {
    return (
      <Profile
        isAuthentificated={this.props.isAuthentificated}
        isFetching={this.props.isFetching} newPostText={this.props.newPostText}
        posts={this.props.posts} userInfo={this.props.userInfo}
        addPost={this.props.addPost} updateNewPostText={this.props.updateNewPostText}
      />
    );
  }
  // ---------------------------------------------------
};

const mapStateToProps = (state) => ({
  isAuthentificated: state.authData.isAuthentificated,
  isFetching:        state.profileData.isFetching,
  newPostText:       state.profileData.newPostText,
  posts:             state.profileData.posts,
  userInfo:          state.profileData.userInfo
});

const actions = { addPost, fetchAuthData, fetchProfile, updateNewPostText };

export default connect(mapStateToProps, actions)(withRouter(ProfileApi));