import React from 'react';
// import Emoji from './Emoji';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Home from './Home';
// import Login from './Login';
import BottomBar from './BottomBar';
/**
 * Simple component with no state.
 * @return {object} JSX
 */
function App() {
  return (
    <div>
      App.js
      {/* <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
      </BrowserRouter> */}
      <BottomBar></BottomBar>
    </div>
  );
}

export default App;
