import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavPage from './NavPage';
import Login from './Login';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <NavPage/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
