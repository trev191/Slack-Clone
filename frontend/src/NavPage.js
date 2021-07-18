/**
 * NavPage.js - creates the main page with React components, consisting of
 * navigation tabs at the bottom to switch to different pages (ie. Home, DMs,
 * Mentions, Search, User, etc.)
 */

import React from 'react';

/**
 * NOTE: This whole file is merely a modified copy of Home.js from
 * the Authenticated Books Example
 */

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
