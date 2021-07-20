import React from 'react';

// MAT-UI COMPONENTS ------
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// ICONS ------
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';

// THEMES AND COLORS ------
import {alpha, makeStyles} from '@material-ui/core/styles';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {purple, green} from '@material-ui/core/colors';

// PERSONAL ------
import NavPage from './NavPage';

/** Base: https://codesandbox.io/s/6khtm?file=/demo.js */
/** Table: https://material-ui.com/components/tables/#table */
/** Drawers: https://material-ui.com/components/drawers/#drawer */

const drawerWidth = 300;
const threadWidth = `calc((100% - ${drawerWidth}px) * 0.5)`;

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
  drawerSpace: { // Left offset space for table
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  threadSpaceClosed: { // Right offset space for thread
    width: 0,
    flexShrink: 0,
  },
  threadSpaceOpened: { // Right offset space for thread
    width: threadWidth,
    flexShrink: 0,
  },
  appBar: { // ?
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  smDownVisible: { // Appear on smDown
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  mdDownVisible: { // Appear on mdUp
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mdVisible: { // Appear only on mdZone
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  mdUpVisible: { // Appear on mdDown
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.up('xs')]: {
      width: `50%`,
    },
    [theme.breakpoints.up('md')]: {
      width: threadWidth,
    },
    [theme.breakpoints.down('xs')]: {
      width: `100%`,
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
    width: '50%',
    display: 'none',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  searchBuffer: {
    position: 'relative',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
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
  mainTextField: {
    position: 'fixed',
    [theme.breakpoints.up('xs')]: {
      bottom: '10px',
      width: `98%`,
    },
    [theme.breakpoints.down('xs')]: {
      bottom: '70px',
      width: `97%`,
    },
    [theme.breakpoints.up('md')]: {
      bottom: '10px',
      width: `calc(99% - ${drawerWidth}px)`,
    },
  },
  threadTextField: {
    position: 'fixed',
    [theme.breakpoints.up('xs')]: {
      bottom: '10px',
      width: `50%`,
    },
    [theme.breakpoints.up('md')]: {
      bottom: '10px',
      width: threadWidth,
    },
    [theme.breakpoints.down('xs')]: {
      bottom: '70px',
      width: `100%`,
    },
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
}));

/**
 * Main function!
 * @return {object} JSX
 */
function ResponsiveDrawer() {
  const classes = useStyles();

  const [mobileWorkspacesOpen, setMobileWorkspacesOpen] =
    React.useState(false);
  const [mobileChannelsOpen, setMobileChannelsOpen] =
    React.useState(false);

  const [webWorkspacesOpen, setWebWorkspacesOpen] =
    React.useState(false);
  const [webUserProfileOpen, setWebUserProfileOpen] =
    React.useState(false);

  const [threadOpened, openThread] = React.useState(false);

  const [currWorkspace, setCurrWorkspace] = React.useState('null');
  const [currChannel, setCurrChannel] = React.useState('null');

  const toggleThread = (open) => (event) => {
    if (event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    openThread(open);
  };

  const openMobileChannelsMenu = () => {
    setMobileChannelsOpen(!mobileChannelsOpen);
  };

  const openMobileWorkspacesMenu = () => {
    setMobileWorkspacesOpen(!mobileWorkspacesOpen);
  };

  const openWebWorkspacesMenu = () => () =>{
    setWebWorkspacesOpen(!webWorkspacesOpen);
  };

  const openWebUserProfileMenu = () => () =>{
    setWebUserProfileOpen(!webUserProfileOpen);
  };

  const changeWorkspace = (newWorkspace) => () => {
    console.log('Changed Workspace ' + newWorkspace);
    setCurrWorkspace(newWorkspace);
  };

  const changeChannel = (newChannel) => () => {
    console.log('Changed Channel to ' + newChannel);
    setCurrChannel(newChannel);
  };

  // const change

  const doNothing = () => () =>{
    console.log('Temp Function Call');
  };

/**
 * @param {id} id
 */
  function threadHandler() {
    openThread(true);
  }

  const workspaces = (
    <div>
      <List>
        <Divider />
          <ListSubheader>
            <ListItemText primary={'Workspaces'} />
          </ListSubheader>
        <Divider />
        <ListItem
          button
          onClick={changeWorkspace('Workspace 1')}
          key={'Workspace 1'}
        >
          <ListItemText primary={'Workspace 1'} />
        </ListItem>
        <ListItem
          button
          onClick={changeWorkspace('Workspace 2')}
          key={'Workspace 2'}>
          <ListItemText primary={'Workspace 2'} />
        </ListItem>
      </List>
    </div>
  );

  const webWorkspaceMenu = (
    <Menu
      onClose={openWebWorkspacesMenu()}
      onClick={openWebWorkspacesMenu()}
      open={webWorkspacesOpen}
    >
      <List>
        <Divider />
          <ListSubheader>
            <ListItemText primary={'Workspaces'} />
          </ListSubheader>
        <Divider />
        <ListItem
          button
          onClick={changeWorkspace('Workspace 1')}
          key={'Workspace 1'}
        >
          <ListItemText primary={'Workspace 1'} />
        </ListItem>
        <ListItem
          button
          onClick={changeWorkspace('Workspace 2')}
          key={'Workspace 2'}>
          <ListItemText primary={'Workspace 2'} />
        </ListItem>
      </List>
    </Menu>
  );

  const webUserProfileMenu = (
    <Menu
      onClose={openWebUserProfileMenu()}
      open={webUserProfileOpen}
      anchorOrigin={{horizontal: 'right'}}
      styles={{width: '600px'}}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <Badge variant="dot" color="secondary" invisible={false}>
              <Avatar>X</Avatar>
            </Badge>
          </ListItemIcon>
          <ListItemText primary={'[User Name]'} />
        </ListItem>
        <Divider />
        <InputBase
            placeholder="Update your status"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        <Divider />
        <ListItem
          button
          onClick={doNothing()}
          key={'Set yourself as away'}
        >
          <ListItemText primary={'Set yourself as away'} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={doNothing()}
          key={'Sign Out'}
        >
          <ListItemText primary={'Sign Out'} />
        </ListItem>
      </List>
    </Menu>
  );

  const channels = (
    <div>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton color="inherit"
            edge="start" onClick={openMobileWorkspacesMenu}
            className={classes.mdDownVisible}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {currWorkspace}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      <Divider />
      <ListSubheader>
        <ListItemText primary={'All DMs'} />
      </ListSubheader>
      <Divider />
      <Divider />
      <ListSubheader>
        <ListItemText primary={'Mentions'} />
      </ListSubheader>
      <Divider />
      <Divider />
      <ListSubheader>
        <ListItemText primary={'Channels'} />
      </ListSubheader>
      <Divider />
      <List>
        <ListItem button onClick={changeChannel('Channel 1')} key={'Inbox'}>
          <ListItemText primary={'Channel 1'} />
        </ListItem>
        <ListItem button onClick={changeChannel('Channel 2')} key={'Trash'}>
          <ListItemText primary={'Channel 2'} />
        </ListItem>
      </List>
      <List>
      <Divider />
      <ListSubheader>
        <ListItemText primary={'Direct Messages'} />
      </ListSubheader>
      <Divider />
        <ListItem button onClick={doNothing()} key={'Inbox'}>
          <ListItemIcon>
            <Badge variant="dot" color="secondary" invisible={false}>
              <Avatar>X</Avatar>
            </Badge>
          </ListItemIcon>
        <ListItemText primary={'Person 1'} />
        </ListItem>
        <ListItem button onClick={doNothing()} key={'Trash'}>
        <ListItemIcon>
          <Badge variant="dot" color="secondary" invisible={false}>
            <Avatar>X</Avatar>
          </Badge>
        </ListItemIcon>
        <ListItemText primary={'Person 2'} />
        </ListItem>
      </List>
    </div>
  );

  const message = (
    <TableRow key={'xxx'}>
      <TableCell align="left" onClick={() => threadHandler()}>
        <ListItem button key={'ID'}>
          <ListItemAvatar>
            <Badge variant="dot" color="secondary" invisible={false}>
              <Avatar>X</Avatar>
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary={'[Person 1\'s Name]'}
            secondary={'[Date]'}
          />
        </ListItem>
        <ListItemText primary={'[Message Body]'}
          secondary={'People in Thread'}/>
      </TableCell>
    </TableRow>
  );

  const messageTable = (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {message}
          {message}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const topWorkspaceBar = (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">
        <IconButton
          color="inherit"
          edge="start"
          onClick={openMobileChannelsMenu}
          className={classes.mdVisible}>
          <MenuIcon />
        </IconButton>
        <IconButton
          color="inherit"
          edge="start"
          onClick={openMobileChannelsMenu}
          className={classes.smDownVisible}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {currChannel}
        </Typography>
        <IconButton
          color="inherit"
          edge="end"
          // Changes workspaces on web! v
          onClick={openWebWorkspacesMenu()}
          className={classes.mdUpVisible}
        >
          <ArrowDropDownCircleIcon />
        </IconButton>
        {webWorkspaceMenu}
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
          />
        </div>
        <div className={classes.searchBuffer}/>
        <IconButton
          color="inherit"
          edge="end"
          onClick={openWebUserProfileMenu()}>
            <Badge variant="dot" color="secondary" invisible={false}>
              <Avatar>X</Avatar>
            </Badge>
        </IconButton>
        {webUserProfileMenu}
      </Toolbar>
    </AppBar>
  );

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      {topWorkspaceBar}
      <NavPage/>
      {/* LeftPanels */}
      <nav className={classes.drawerSpace}>
        {/* Mobile Channel Panel */}
        <Hidden smDown implementation="css">
          <Drawer
            classes={{paper: classes.drawerSize}}
            variant="temporary"
            open={mobileChannelsOpen}
            onClose={openMobileChannelsMenu}
            onClick={openMobileChannelsMenu}
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
            onClose={openMobileWorkspacesMenu}
            onClick={openMobileWorkspacesMenu}
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
        {messageTable}
        <TextField
          label="Send a message to ${currChannel}"
          size="small"
          variant="outlined"
          multiline
          className={classes.mainTextField}
          InputProps={{
            endAdornment:
            <InputAdornment position="end">
                <IconButton
                  color={theme.palette.primary.dark}
                  edge="end"
                  // Sends msg to channel v
                  onClick={doNothing()}>
                  <SendIcon />
                </IconButton>
            </InputAdornment>,
          }}
        />
      </main>
      {/* ThreadPanel */}
      <nav
        className={
          threadOpened ?
          classes.threadSpaceOpened :
          classes.threadSpaceClosed}
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
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={toggleThread(false)}
                  className={classes.smDownVisible}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.title}>
                  Thread : {currChannel}
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.toolbar} />
            <Typography variant="h6">
              {messageTable}
            </Typography>
            <TextField
              label="Add a reply..."
              size="small"
              variant="outlined"
              multiline
              className={classes.threadTextField}
              InputProps={{
                endAdornment:
                <InputAdornment position="end">
                    <IconButton
                      color="inherit"
                      edge="end"
                      // Sends msg to thread v
                      onClick={doNothing()}>
                      <SendIcon />
                    </IconButton>
                </InputAdornment>,
              }}
            >
            </TextField>
          </Drawer>
        </Hidden>
      </nav>
      </ThemeProvider>
    </div>
  );
}

export default ResponsiveDrawer;
