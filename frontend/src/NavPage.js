import React from 'react';
import {Link} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  displayBottomBar: { // Hides bottom bar
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

/**
 * Simple component with no state.
 * @return {object} JSX
 */
function BottomBar() {
  const classes = useStyles();
  return (
    <div>
      <BottomNavigation
        className={classes.displayBottomBar}
        style={{position: 'fixed', bottom: '0', width: '100%'}}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          icon={<HomeIcon />} />
        <BottomNavigationAction
          component={Link}
          to="/dms"
          icon={<ForumIcon />} />
        <BottomNavigationAction
          component={Link}
          to="/mentions"
          icon={<AlternateEmailIcon />} />
        <BottomNavigationAction
          component={Link}
          to="/search"
          icon={<SearchIcon />} />
        <BottomNavigationAction
          component={Link}
          to="/user"
          icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default BottomBar;
