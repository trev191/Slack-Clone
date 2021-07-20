import React from 'react';
import {useHistory} from 'react-router-dom';

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
import {makeStyles} from '@material-ui/core/styles';
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
    width: `calc((100% - 300px))`,
    // [theme.breakpoints.up('xs')]: {
    //   width: `50%`,
    // },
    [theme.breakpoints.down('sm')]: {
      width: `100%`,
    },
    // [theme.breakpoints.down('xs')]: {
    //   width: `calc((100% - 300px))`,
    // },
  },
  content: { // ?
    flexGrow: 1,
    padding: theme.spacing(1), // size of the message elements
  },
  title: {
    flexGrow: 1,
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    width: 'auto',
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
    width: `calc((100% - 300px))`,
    bottom: '10px',
    [theme.breakpoints.down('sm')]: {
      bottom: '10px',
      width: `100%`,
    },
    [theme.breakpoints.down('xs')]: {
      bottom: '70px',
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
function DMs() {
  const classes = useStyles();
  const history = useHistory();

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
 * @param {bool} bool
 */
  function threadHandler(bool) {
    openThread(bool);
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
        <ListItemText
          primary={'All DMs'}
          onClick={
            () => {
              history.push('/dms');
          }}
        />
      </ListSubheader>
      <Divider />
      <ListSubheader>
      <ListItemText
          primary={'Mentions'}
          onClick={
            () => {
              history.push('/mentions');
          }}
        />
      </ListSubheader>
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
    <div>
      {/* Thread handler should also change state
      of the side thread panel */}
      <ListItem key={'ID'} button onClick={() => threadHandler(true)}>
        <ListItemAvatar>
          <Badge variant="dot" color="secondary" invisible={false}>
            <Avatar>X</Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={'[Person 1\'s Name]  /  [Date]'}
          secondary={'[Message Body] : ' +
            'dsasdad sdddddddd dddddddd ddddd ddddddd' +
            'dsa sdadsdddd dddddddd ddddddddddd ddddd' +
            'dsas dadsdddddd dddddddddd ddddddd ddddd'}
        />
      </ListItem>
    </div>
  );

  const messageTable = (
    <List>
      {message}
      {message}
      {message}
    </List>
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
          <TextField
            label="Search…"
            size="small"
            variant="outlined"
            className={classes.search}
            InputProps={{
              endAdornment:
              <InputAdornment position="end">
                  <IconButton
                    color={theme.palette.primary.dark}
                    edge="end"
                    onClick={doNothing()}
                    >
                    <SearchIcon />
                  </IconButton>
              </InputAdornment>,
            }}
          />
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
        <ListSubheader>
          <ListItemText
            primary='All Direct Messages'
          />
        </ListSubheader>
        {messageTable}
      </main>
      {/* ThreadPanel */}
      <nav>
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
                  onClick={toggleThread(false)}>
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

export default DMs;
