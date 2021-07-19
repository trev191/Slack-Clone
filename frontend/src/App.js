import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavPage from './NavPage';
import Login from './Login';
import Home from './Home';
import DMs from './DMs';
import Mentions from './Mentions';
import Search from './Search';
import UserProfile from './UserProfile';

import './App.css';
/**
 * Simple component with no state.
 * @return {object} JSX
 */
function App() {
  return (
    <div>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" exact id="route">
          <Login/>
        </Route>
        <Route exact path="/" exact id="route">
          <Home/>
        </Route>
        <Route exact path="/dms" exact id="route">
          <NavPage/>
          <DMs/>
        </Route>
        <Route exact path="/mentions" exact id="route">
          <NavPage/>
          <Mentions/>
        </Route>
        <Route exact path="/search" exact id="route">
          <NavPage/>
          <Search/>
        </Route>
        <Route exact path="/user" exact id="route">
          <NavPage/>
          <UserProfile/>
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
