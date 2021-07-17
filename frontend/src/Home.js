/**
 * Home.js - creates the home page with React components, consisting of
 * navigation tabs at the bottom
 */

import React from 'react';

/**
 * NOTE: This whole file is merely a modified copy of Home.js from
 * the Authenticated Books Example
 */

// const fetchUserName = (setName, setError) => {
//   // see if authentication exists in local storage first
//   const item = localStorage.getItem('user');
//   if (!item) {
//     return;
//   }
//   const user = JSON.parse(item);
// }

/**
 * @return {object} JSX Table
 */
function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [name, setName] = React.useState(user ? user.name : '');

  const logout = () => {
    localStorage.removeItem('user');
    setName('');
  };

  return (
    <div>
      <h2 id='welcome'>Slack Clone</h2>
      <a href='/Login'>Login</a>
      <br />
      <button disabled={!name} onClick={logout}> Logout</button>
      <label>{name ? name : ''}</label>
    </div>
  );
}

export default Home;
