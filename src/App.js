import './App.css';
import { Route } from 'react-router-dom';
import Header  from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Feed    from './components/Content/Feed/Feed';
import Profile from './components/Content/Profile/Profile';
import Dialogs from './components/Content/Dialogs/Dialogs';

const App = (/* props */) => {
  return (
    <div className="App">
      <Header />
      <div className="content-container">
        <Sidebar />
        <Route path="/." exact><Feed /></Route>
        <Route path="/profile" exact><Profile /></Route>
        <Route path="/dialogs" exact><Dialogs /></Route>
      </div>
    </div>
  );
};

export default App;
