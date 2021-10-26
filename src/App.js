import './App.css';
import { Route } from 'react-router-dom';
import Header    from './components/Header/Header';
import Sidebar   from './components/Sidebar/Sidebar';
import Feed             from './components/Content/Feed/Feed';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import ProfileContainer from './components/Content/Profile/ProfileContainer';
import UsersContainer   from './components/Content/Users/UsersContainer';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="content-container">
        <Sidebar />
        <Route path="/." exact><Feed /></Route>
        <Route path="/dialogs/:contactId?" exact><DialogsContainer /></Route>
        <Route path="/profile/:userId?" exact><ProfileContainer /></Route>
        <Route path="/users" exact><UsersContainer /></Route>
      </div>
    </div>
  );
};

export default App;