/**
 * Sources Used:
 *  Avatar Icon:
 *    https://material-ui.com/components/avatars/
 *    https://codesandbox.io/s/jq1iv?file=/demo.js:675-753
 *
 *  All Material-UI Icons:
 *    https://material-ui.com/components/material-icons/
 *
 *  How to vertically align components in a Container:
 *    https://mdbootstrap.com/docs/b5/react/layout/vertical-alignment/
 */

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import {useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    'padding': '10px 10px 10px 10px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  activeStatus: {
    // the status (circle) indicating the user is ACTIVE
    color: 'green',
  },
  awayStatus: {
    // the status (circle) indicating the user is AWAY
    color: 'gray',
  },
  nameHeader: {
    // the Container containing the Avatar, the Username,
    // and the Status (the circle and text)
    'display': 'inline-flex',
    'align-items': 'center',
  },
  nameStatus: {
    // the Container containing just the username and the status
    display: 'block',
    width: '100%',
  },
  blockContainer: {
    // the Container to (hopefully, but failed to) display on
    // a new line (ie. below the nameHeader)
    display: 'block',
    flexGrow: 1,
    width: 'auto',
    borderRadius: '2px',
    border: 'solid',
    position: 'relative',
  },
  button: {
    // for Buttons that toggle the user status and sign out
    cursor: 'pointer',
  },
}));

/**
 * Simple component with no state.
 * @return {object} JSX
 */
function UserProfile() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  // isActive is current status of the user (either active or away)
  const [isActive, toggleActive] = React.useState(true);

  const logout = () => {
    localStorage.removeItem('user');
    // go back to login screen
    history.push('/Login');
  };

  // flip the user status from away to active, or vice versa
  const toggleStatus = () => {
    toggleActive(!isActive);
  };

  const active = (
    <div>
    <FiberManualRecordIcon className={classes.activeStatus}/>
    <Typography variant="caption">ACTIVE</Typography>
    </div>
  );

  const away = (
    <div>
      <FiberManualRecordIcon className={classes.awayStatus}/>
      <Typography variant="caption">AWAY</Typography>
    </div>
  );

  return (
    <div className={classes.root}>
      {/* Container of Avatar, Username, and Current Status */}
      <Container className={classes.nameHeader}>
        <Avatar alt={user ? user.userName : ''}/>
        <Container className={classes.nameStatus}>
          <Typography variant="h6">
            {user ? user.userName : ''}
          </Typography>
          {isActive? active : away}
        </Container>
      </Container>

      {/* Input field for setting the User Status Message */}
      <TextField
        id="outlined-basic"
        label="What's your status?"
        size="small"
        variant="outlined"
        style={{width: '95%'}}
      />

      {/* Container (button) for Toggling Status */}
      <Container>
        <Typography variant="h7" onClick={toggleStatus}
          className={classes.button}>
          Set Yourself as {isActive? 'AWAY' : 'ACTIVE'}
        </Typography>
      </Container>
      <Divider />

      {/* Container (button) for Signing Out */}
      <Container>
        <Typography variant="h7" onClick={logout}
          className={classes.button}>
          Sign Out
        </Typography>
      </Container>
    </div>
  );
}

export default UserProfile;
