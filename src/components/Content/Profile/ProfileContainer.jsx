import React          from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';
import { profileApi } from '../../../api/api';
import {
  addPost, setIsFetching, setUserInfo, updateNewPostText
} from '../../../redux/profile-reducer';
import Profile from './Profile';

class ProfileApi extends React.Component {
  // ---------------------------------------------------
  _fetchProfile(userId) {
    this.props.setIsFetching(true);
    profileApi.getProfile(userId).then(
      (data) => {
        this.props.setIsFetching(false);
        if (!data) { return; }
        if (data.status < 0) {
          console.error(`Profile API: ${data.status} ${data.error}`);
          return;
        }
        this.props.setUserInfo(data.profile);
      }
    );
  }
  // ---------------------------------------------------
  componentDidMount() {
    const userId = (this.props.match.params.userId) ? parseInt(this.props.match.params.userId) : 0;
    this._fetchProfile(userId);
  }
  // ---------------------------------------------------
  render() {
    return (
      <Profile
        isFetching={this.props.isFetching} newPostText={this.props.newPostText}
        posts={this.props.posts} userInfo={this.props.userInfo}
        addPost={this.props.addPost} updateNewPostText={this.props.updateNewPostText}
      />
    );
  }
  // ---------------------------------------------------
};

const mapStateToProps = (state) => ({
  isFetching:  state.profileData.isFetching,
  newPostText: state.profileData.newPostText,
  posts:       state.profileData.posts,
  userInfo:    state.profileData.userInfo
});

const actions = { addPost, setIsFetching, setUserInfo, updateNewPostText };

export default connect(mapStateToProps, actions)(withRouter(ProfileApi));