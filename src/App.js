import { Route } from 'react-router-dom';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import FeedContainer    from './components/Content/Feed/FeedContainer';
import LogInContainer   from './components/Content/LogIn/LogInContainer';
import ProfileContainer from './components/Content/Profile/ProfileContainer';
import UsersContainer   from './components/Content/Users/UsersContainer';
import HeaderContainer  from './components/Header/HeaderContainer';
import Sidebar          from './components/Sidebar/Sidebar';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <HeaderContainer />
      <div className="content-container">
        <Sidebar />
        <Route path="/." exact><FeedContainer /></Route>
        <Route path="/dialogs/:contactId?" exact><DialogsContainer /></Route>
        <Route path="/log_in" exact><LogInContainer /></Route>
        <Route path="/profile/:userId?" exact><ProfileContainer /></Route>
        <Route path="/users" exact><UsersContainer /></Route>
      </div>
    </div>
  );
};

export default App;