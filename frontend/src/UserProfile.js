import React from 'react';

// MAT-UI COMPONENTS ------
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// THEMES AND COLORS ------
import {makeStyles} from '@material-ui/core/styles';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {purple, green} from '@material-ui/core/colors';

// PERSONAL ------
import NavPage from './NavPage';

// BACKEND ------
import {useHistory} from 'react-router-dom';

/** Base: https://codesandbox.io/s/6khtm?file=/demo.js */
/** Table: https://material-ui.com/components/tables/#table */
/** Drawers: https://material-ui.com/components/drawers/#drawer */

const drawerWidth = 300;

const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
    secondary: {
      main: green[400],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: { // ?
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  toolbar: theme.mixins.toolbar, // Offset space for top appBar
  content: { // ?
    flexGrow: 1,
    padding: theme.spacing(1), // size of the message elements
  },
  title: {
    flexGrow: 1,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  button: {
    // for Buttons that toggle the user status and sign out
    cursor: 'pointer',
  },
}));

/**
 * Main function!
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
    history.push('/');
  };

  // flip the user status from away to active, or vice versa
  const toggleStatus = () => {
    toggleActive(!isActive);
  };

  // check if user is signed in and redirect immediately to login page if false
  const checkLoggedIn = () => {
    const item = localStorage.getItem('user');
    if (!item) {
      // go back to the login page
      history.push('/');
    }
  };

  React.useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        {/* Top Bar */}
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar variant="dense">
            <Typography variant="h6" noWrap>
              You
            </Typography>
          </Toolbar>
        </AppBar>
        <NavPage/>
        {/* Main Content */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <List>
            <ListItem>
              <ListItemIcon>
                <Badge
                  variant="dot"
                  color="secondary"
                  invisible={isActive? false : true}
                >
                  <Avatar>X</Avatar>
                </Badge>
              </ListItemIcon>
              <ListItemText
                primary={user ? user.userName : '[User Name]'}
                secondary={isActive? 'Active' : 'Away'}
              />
            </ListItem>
            <Divider />
            <InputBase
              placeholder="What's your status?"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
            <Divider />
            <ListItem
              button
              onClick={toggleStatus}
              key={'Set yourself as away'}
            >
              <ListItemText
                primary={isActive ?
                  'Set Yourself as Away' :
                  'Set Yourself as Active'
                }
              />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={logout}
              key={'Sign Out'}
            >
              <ListItemText primary={'Sign Out'} />
            </ListItem>
          </List>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default UserProfile;
