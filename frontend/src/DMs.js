/**
 * Sources Used:
 *    The fetchDMs() function is merely a modified version of fetchBooks()
 *    from the authenticated books example.
 */

import React from 'react';

const fetchDMs = (setDms) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/DMs', {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      setDms(json);
    })
    .catch((error) => {
      console.log(error);
      setDms([]);
      setDms([' error']);
    });
};

/**
 * React page for Direct Messages
 * @return {object} JSX
 */
function DMs() {
  // array of all unique direct messages (objects w/ id, subject, to, etc.)
  const [dms, setDms] = React.useState([]);

  // fetch all DMs when page is first loaded
  React.useEffect(() => {
    fetchDMs(setDms);
  }, []);

  return (
    <div>
      DMs
      {dms}
    </div>
  );
}

export default DMs;
