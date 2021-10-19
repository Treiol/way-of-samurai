import './App.css';
import { Route } from 'react-router-dom';
import Header  from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Feed    from './components/Content/Feed/Feed';
import ProfileContainer from './components/Content/Profile/ProfileContainer';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="content-container">
        <Sidebar />
        <Route path="/." exact><Feed /></Route>
        <Route path="/profile" exact><ProfileContainer /></Route>
        <Route path="/dialogs/:contactId?" exact><DialogsContainer /></Route>
      </div>
    </div>
  );
};

export default App;