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
import {makeStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import NavPage from './NavPage';

/** Base: https://codesandbox.io/s/6khtm?file=/demo.js */
/** Table: https://material-ui.com/components/tables/#table */
/** Drawers: https://material-ui.com/components/drawers/#drawer */

const drawerWidth = 240;
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
}));

/**
 * Main function!
 * @return {object} JSX
 */
function ResponsiveDrawer() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [threadOpened, openThread] = React.useState(false);

  const toggleTab = (open) => (event) => {
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

/**
 * @param {id} id
 */
  function threadHandler() {
    openThread(true);
  }

  const channels = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={toggleTab(false)} key={'Inbox'}>
          <ListItemText primary={'Channel 1'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={toggleTab(true)} key={'Trash'}>
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
              [MESSAGE]
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  const topAppBar = (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer"
          edge="start" onClick={handleDrawerToggle}
          className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          [CURR WORKSPACE]
        </Typography>
      </Toolbar>
    </AppBar>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {topAppBar}
      <NavPage/>
      {/* LeftPanels */}
      <nav className={classes.drawerSpace} aria-label="mailbox folders">
        {/* Mobile LeftPanel */}
        <Hidden smDown implementation="css">
          <Drawer
            classes={{paper: classes.drawerSize}}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onClick={handleDrawerToggle}
            BackdropProps={{invisible: true}}
            ModalProps={{keepMounted: true}}
          >
            {channels}
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
              <Toolbar>
                <Typography variant="h6" noWrap className={classes.title}>
                  [THREAD]
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
              [THREAD CONTENT]
            </Typography>
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;
