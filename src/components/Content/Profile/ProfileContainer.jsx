import React          from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios          from 'axios';
import {
  addPost, setIsFetching, setUserInfo, updateNewPostText
} from '../../../redux/profile-reducer';
import Profile from './Profile';

class ProfileApi extends React.Component {
  // ---------------------------------------------------
  _fetchProfile(userId) {
    if (!userId) { return; }
    this.props.setIsFetching(true);
    Axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(
      (response) => {
        this.props.setIsFetching(false);
        if (response.status >= 400) {
          console.error(`Failed to get users:\n${response.status} ${response.statusText}`);
          return;
        }
        this.props.setUserInfo(response.data);
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
        newPostText={this.props.newPostText} posts={this.props.posts} userInfo={this.props.userInfo}
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