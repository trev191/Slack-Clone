import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {alpha, makeStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import NavPage from './NavPage';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

/** Base: https://codesandbox.io/s/6khtm?file=/demo.js */
/** Table: https://material-ui.com/components/tables/#table */
/** Drawers: https://material-ui.com/components/drawers/#drawer */

const drawerWidth = 300;
const threadWidth = `calc((100% - ${drawerWidth}px) * 0.5)`;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerSpace: { // Left offset space for table
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  threadSpaceClosed: { // Left offset space for table
    width: 0,
    flexShrink: 0,
  },
  threadSpaceOpened: { // Left offset space for table
    width: threadWidth,
    flexShrink: 0,
  },
  appBar: { // ?
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: { // Three Lines
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar, // Offset space for top appBar
  drawerSize: { // Size of the drawer objects
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  threadSize: { // Size and margin of the threadSize
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: threadWidth,
    },
  },
  content: { // ?
    flexGrow: 1,
    padding: theme.spacing(1), // size of the message elements
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
      display: 'block',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBar: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

/**
 * Main function!
 * @return {object} JSX
 */
function ResponsiveDrawer() {
  const classes = useStyles();
  const [mobileChannelsOpen, setMobileChannelsOpen] = React.useState(false);
  const [mobileWorkspacesOpen, setMobileWorkspacesOpen] = React.useState(false);
  const [threadOpened, openThread] = React.useState(false);

  const toggleChannels = (open) => (event) => {
    if (event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
  };

  const toggleThread = (open) => (event) => {
    if (event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    openThread(open);
  };

  const openChannelsMenu = () => {
    setMobileChannelsOpen(!mobileChannelsOpen);
  };

  const openWorkspacesMenu = () => {
    setMobileWorkspacesOpen(!mobileWorkspacesOpen);
  };

/**
 * @param {id} id
 */
  function threadHandler() {
    openThread(true);
  }

  const workspaces = (
    <div>
      <Divider />
      <List>
        <ListItem button onClick={toggleChannels(false)} key={'Workspace 1'}>
          <ListItemText primary={'Workspace 1'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={toggleChannels(true)} key={'Workspace 2'}>
          <ListItemText primary={'Workspace 2'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const channels = (
    <div>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="open drawer"
            edge="start" onClick={openWorkspacesMenu}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            [Workspace Name]
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={toggleChannels(false)} key={'Inbox'}>
          <ListItemText primary={'Channel 1'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={toggleChannels(true)} key={'Trash'}>
          <ListItemText primary={'Channel 2'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const mainMessages = (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          <TableRow key={'xxx'}
            onClick={() => threadHandler()}>
            <TableCell align="center">
              [Message]
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  const topWorkspaceBar = (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">
        <IconButton color="inherit" aria-label="open drawer"
          edge="start" onClick={openChannelsMenu}
          className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          [Channel Name]
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{'aria-label': 'search'}}
          />
        </div>
        <IconButton
          color="inherit"
          edge="end"
          aria-label="open drawer"
          onClick={toggleThread(false)}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {topWorkspaceBar}
      <NavPage/>
      {/* LeftPanels */}
      <nav className={classes.drawerSpace} aria-label="mailbox folders">
        {/* Mobile Channel Panel */}
        <Hidden smDown implementation="css">
          <Drawer
            classes={{paper: classes.drawerSize}}
            variant="temporary"
            open={mobileChannelsOpen}
            onClose={openChannelsMenu}
            onClick={openChannelsMenu}
            BackdropProps={{invisible: true}}
            ModalProps={{keepMounted: true}}
          >
            {channels}
          </Drawer>
        </Hidden>
        {/* Mobile Workspace Panel */}
        <Hidden smDown implementation="css">
          <Drawer
            classes={{paper: classes.drawerSize}}
            variant="temporary"
            open={mobileWorkspacesOpen}
            onClose={openWorkspacesMenu}
            onClick={openWorkspacesMenu}
            BackdropProps={{invisible: true}}
            ModalProps={{keepMounted: true}}
          >
            {workspaces}
          </Drawer>
        </Hidden>
        {/* Website LeftPanel */}
        <Hidden smDown implementation="css">
          <Drawer
            classes={{paper: classes.drawerSize}}
            variant="permanent"
            open
          >
            {channels}
          </Drawer>
        </Hidden>
      </nav>
      {/* Main Content */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {mainMessages}
        <TextField
          id="outlined-basic"
          label="Send a message to [Channel Name]"
          size="small"
          variant="outlined"
          multiline
          fullWidth
          style={{position: 'fixed', bottom: '0', width: '100%'}}
        />
      </main>
      {/* ThreadPanel */}
      <nav
        className={
          threadOpened ?
          classes.threadSpaceOpened :
          classes.threadSpaceClosed}
        aria-label="mailbox folders"
      >
        <Hidden smDown implementation="css">
          <Drawer
              classes={{paper: classes.threadSize}}
              variant='temporary'
              onClose={toggleThread(false)}
              open={threadOpened}
              BackdropProps={{invisible: true}}
              ModalProps={{keepMounted: true}}
              anchor="right"
              transitionDuration={0}
          >
            <AppBar position="absolute">
              <Toolbar variant="dense">
                <Typography variant="h6" noWrap className={classes.title}>
                  Thread [current channel]
                </Typography>
                <IconButton
                  color="inherit"
                  edge="end"
                  aria-label="open drawer"
                  onClick={toggleThread(false)}>
                <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
            <div className={classes.toolbar} />
            <Typography variant="h6">
              <div className={classes.toolbar} />
              {mainMessages}
            </Typography>
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;
