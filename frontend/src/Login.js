/**
 * Login.js - contains input fields for logging in with email and password
 * and links it with the backend database
 */

/**
 * NOTE: This whole file is merely a modified copy of Login.js from
 * the Authenticated Books Example
 * 
 * Sources Used:
 *  To reroute the browser to another page:
 *    https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
 */

import React from 'react';
// import {useHistory} from 'react-router-dom';

/**
 * contain input fields for user to login and authenticate
 * @return {component} input fields for user email and password to login
 */
function Login() {
  const [user, setUser] = React.useState({email: '', password: ''});
  // const history = useHistory();

  // update user object state when input field changes
  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // attempt to sign in by making a POST request with the name and password
    fetch('/authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // if we got a bad result, throw it and return the result in JSON
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        // if we got a valid sign in, save the returned object in localStorage
        localStorage.setItem('user', JSON.stringify(json));
        // go back to main screen (history.push throws error, so
        // use location.replace instead)
        // history.push('/');
        window.location.replace('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Error logging in, please try again');
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 id='welcome'>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="EMail"
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
        required
      />
      <input type="submit" value="Submit"/>
    </form>
  );
}

export default Login;
