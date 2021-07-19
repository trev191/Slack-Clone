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
function NavPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [username, setUsername] = React.useState(user ? user.userName : '');

  const logout = () => {
    localStorage.removeItem('user');
    setUsername('');
  };

  return (
    <div>
      <h2 id='welcome'>Slack Clone</h2>
      <a href='/Login'>Login</a>
      <br />
      <button disabled={!username} onClick={logout}> Logout</button>
      <label>{username ? username : ''}</label>
    </div>
  );
}

export default NavPage;
