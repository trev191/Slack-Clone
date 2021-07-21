import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
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
          <Route exact path="/" id="route">
            <Login/>
          </Route>
          <Route exact path="/home" id="route">
            <Home/>
          </Route>
          <Route exact path="/dms" id="route">
            <DMs/>
          </Route>
          <Route exact path="/mentions" id="route">
            <Mentions/>
          </Route>
          <Route exact path="/search" id="route">
            <Search/>
          </Route>
          <Route exact path="/user" id="route">
            <UserProfile/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
