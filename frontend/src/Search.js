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

// BACKEND ------
import {useHistory} from 'react-router-dom';

/** Base: https://codesandbox.io/s/6khtm?file=/demo.js */
/** Table: https://material-ui.com/components/tables/#table */
/** Drawers: https://material-ui.com/components/drawers/#drawer */

// backend function to retrieve an array of workspace objects;
// each workspace object consists of the workspace name and an array
// of channel objects; each channel object consists of the channel name,
// the channel id, and the threads/replies within the channel
const fetchWorkspacesAndChannels =
  (setWorkspacesAndChannels, setCurrWorkspace, setCurrChannel) => {
    const item = localStorage.getItem('user');
    if (!item) {
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';
    fetch('/v0/workspace', {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log('Logged Out');
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setWorkspacesAndChannels(json);
        setCurrWorkspace(json[0].workspaceName);
        setCurrChannel(json[0].channels[0].channelName);
      })
      .catch((error) => {
        console.log(error);
        setWorkspacesAndChannels([]);
      });
  };

const fetchDMs = (setDms) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/dms', {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log('Logged Out');
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
    });
};

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
  drawerSpace: { // Left offset space for table
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: { // ?
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  smUpVisible: { // Appear on smUp
    [theme.breakpoints.down('xs')]: {
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
  mobileDrawerSize: { // Size of the drawer objects
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  threadSize: { // Size and margin of the threadSize
    width: `calc((100% - 300px))`,
    [theme.breakpoints.down('sm')]: {
      width: `100%`,
    },
  },
  mainTableSize: { // Size of the message table
    flexGrow: 1,
    maxHeight: '750px',
    // backgroundColor: 'lightgrey',
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxHeight: '800px',
    },
  },
  content: { // Size of the main section
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    width: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  threadTextField: {
    position: 'fixed',
    backgroundColor: 'white',
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
function Search() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));
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

  // User Green Dot Status
  const [isActive, toggleActive] = React.useState(true);

  // Current location of User
  const [currWorkspace, setCurrWorkspace] = React.useState('null');
  const [currChannel, setCurrChannel] = React.useState('null');
  const [currThread, setThread] = React.useState(null);

  // Workspaces and Channels Backend ---
  const [workspacesAndChannels, setWorkspacesAndChannels] =
    React.useState([]);

  // DMs Backend ---
  const [dms, setDms] = React.useState([]);

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

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  // flip the user status from away to active, or vice versa
  const toggleStatus = () => {
    toggleActive(!isActive);
  };

  // Change Workspace and Channel ---
  const changeWorkspace = (newWorkspace) => () => {
    setCurrWorkspace(newWorkspace);
    {if (mobileWorkspacesOpen) {
      openMobileWorkspacesMenu();
    }};
  };
  const changeChannel = (newChannel) => () => {
    setCurrChannel(newChannel);
    setMobileChannelsOpen(false);
  };

  /**
 * @param {messages} messages
 * @param {bool} bool
 */
  function threadHandler(messages, bool) {
    setThread(messages);
    openThread(bool);
  }

  /**
 * @param {inputDate} inputDate
 * @return {str} str
 */
   function convertDate(inputDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
      'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let output = null;
    const yearAgo = new Date();
    const dayAgo = new Date();
    const emailDate = new Date(inputDate);
    yearAgo.setFullYear(yearAgo.getFullYear()-1);
    dayAgo.setDate(dayAgo.getDate()-1);
    if (yearAgo > emailDate) {
      output = emailDate.getFullYear();
    } else {
      output = months[emailDate.getMonth().toString()] +
        ' ' + emailDate.getDate();
    }
    if (dayAgo < emailDate) {
      const hours = emailDate.getHours();
      let mins = emailDate.getMinutes();
      if (mins < 10) {
        mins = '0' + mins;
      }
      output = hours + ':' + mins;
    }
    return output;
  }

  const threadMessage = (msg) => (
    <div>
      <ListItem key={'ID'}>
        <ListItemAvatar>
          <Badge variant="dot" color="secondary" invisible={false}>
            <Avatar>{msg.from.charAt(0)}</Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={msg.from + '  -  ' + convertDate(msg.time)}
          secondary={msg.content}
        />
      </ListItem>
    </div>
  );

  const mainMessage = (convo) => (
    <div>
      <ListItem
        key={'ID'}
        button
        onClick={() => threadHandler(convo.messages, true)}
      >
        <ListItemAvatar>
          <Badge
            variant="dot"
            color="secondary"
            invisible={false}
          >
            <Avatar>
              {convo.messages[convo.messages.length-1].from.charAt(0)}
            </Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={convo.messages[convo.messages.length-1].from + '  -  ' +
          convertDate(convo.messages[convo.messages.length-1].time)}
          secondary={convo.messages[convo.messages.length-1].content}
        />
      </ListItem>
    </div>
  );

  const DMDisplay = (
    <List
      className = {classes.mainTableSize}
    >
      {dms.map(
        (convo) =>
          mainMessage(convo),
      )}
    </List>
  );

  const threadMessageTable = (
    <List
      className = {classes.mainTableSize}
    >
      {currThread ?
        currThread.map((message)=> threadMessage(message)) :
        ''}
    </List>
  );

  const workspaceListItem = (workspace) => (
    <ListItem
      button
      onClick={ changeWorkspace(workspace.workspaceName)}
      key={workspace.workspaceName}
    >
      <ListItemText
        primary={workspace.workspaceName}
      />
    </ListItem>
  );

  const workspacesTable = (
    <div>
      {workspacesAndChannels ?
        workspacesAndChannels.map(
          (workspace)=> workspaceListItem(workspace)) :
        ''}
    </div>
  );

  const workspaces = (
    <div>
      <List>
        <Divider />
        <ListSubheader>
          <ListItemText primary={'Workspaces'} />
        </ListSubheader>
        <Divider />
        {workspacesTable}
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
        {workspaces}
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
            <Badge
              variant="dot"
              color="secondary"
              invisible={isActive? false : true}
            >
              <Avatar>
                {user ? user.userName.charAt(0) : ''}
              </Avatar>
            </Badge>
          </ListItemIcon>
          <ListItemText
            primary={user ? user.userName : '[User Name]'}
            secondary={isActive? 'Active' : 'Away'}
          />
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
    </Menu>
  );


  /**
   * @return {array} JSX
  */
  function returnChannelsArray() {
    let arr = [];
    workspacesAndChannels.map(
      (workspace) => {
        if (workspace.workspaceName === currWorkspace) {
          arr = workspace.channels;
        }
      },
    );
    return arr;
  }

  const channelListItem = (channel) => (
    <ListItem
      button
      onClick={changeChannel(channel.channelName)}
      key={channel.channelName}
    >
      <ListItemText
        primary={channel.channelName}
      />
    </ListItem>
  );

  const channelsTable = (
    <List>
      {returnChannelsArray().map(
        (channel) =>
          channelListItem(channel),
      )}
    </List>
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
      <div className={classes.smUpVisible}>
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
      </div>
      <Divider />
      <ListSubheader>
        <ListItemText
          primary={'Channels'}
          onClick={
            () => {
              history.push('/home');
            }}
        />
      </ListSubheader>
      <Divider />
      {channelsTable}
      <List>
        <Divider />
        <ListSubheader>
          <ListItemText primary={'Direct Messages'} />
        </ListSubheader>
        <Divider />
        {DMDisplay}
      </List>
    </div>
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
          Search
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
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>,
          }}
        />
        <div className={classes.smUpVisible}>
          <IconButton
            color="inherit"
            edge="end"
            onClick={openWebUserProfileMenu()}>
            <Badge
              variant="dot"
              color="secondary"
              invisible={isActive? false : true}
            >
              <Avatar>
                {user ? user.userName.charAt(0) : ''}
              </Avatar>
            </Badge>
          </IconButton>
        </div>
        {webUserProfileMenu}
      </Toolbar>
    </AppBar>
  );

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
    fetchWorkspacesAndChannels(setWorkspacesAndChannels,
      setCurrWorkspace, setCurrChannel);
    fetchDMs(setDms);
  }, []);

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
              classes={{paper: classes.mobileDrawerSize}}
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
              primary='Search'
            />
          </ListSubheader>
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
                {threadMessageTable}
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
                      edge="end">
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

export default Search;
