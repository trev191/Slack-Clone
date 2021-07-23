/**
 * Sources Used:
 *    The fetchDMs() function is merely a modified version of fetchBooks()
 *    from the authenticated books example.
 */

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
      if (json[0].channels[0] !== undefined) {
        setCurrChannel(json[0].channels[0].channelName);
      }
    })
    .catch((error) => {
      console.log(error);
      setWorkspacesAndChannels([]);
    });
};


// backend function to retrieve all threads and replies within a channel
const fetchThreadsAndReplies =
  (workspaces, setThreadsAndReplies, newChannel) => {
  const item = localStorage.getItem('user');
  if (!item || newChannel === 'null') {
    return;
  }
  const user = JSON.parse(item);

  // get the corresponding channel name based on the current channel (had to
  // modify the map function to prevent .map from checking every single
  // workspace and channel after a match has already been found)
  let currChannelId = null;
  workspaces.map(({channels}) => {
    if (!currChannelId) {
      const f = channels.find(({channelName}) =>
        channelName === newChannel);
      if (f) {
        currChannelId = f.channelId;
      }
    }
    return true;
  });

    const bearerToken = user ? user.accessToken : '';
    fetch('/v0/channel/' + currChannelId, {
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
        setThreadsAndReplies(json.reverse());
      })
      .catch((error) => {
        console.log(error);
        setThreadsAndReplies([]);
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
  workspaceDrawerSize: { // Size of the drawer objects
    width: '70%',
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
    overflow: 'auto',
    [theme.breakpoints.up('sm')]: {
      // maxHeight: '60%',
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
  mainTextField: {
    position: 'fixed',
    backgroundColor: 'white',
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
  mainTextField2: {
    position: 'fixed',
    backgroundColor: 'white',
    [theme.breakpoints.up('xs')]: {
      bottom: '50px',
      width: `98%`,
    },
    [theme.breakpoints.down('xs')]: {
      bottom: '110px',
      width: `97%`,
    },
    [theme.breakpoints.up('md')]: {
      bottom: '50px',
      width: `calc(99% - ${drawerWidth}px)`,
    },
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
function DMs() {
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

  // First message of Current Thread/DM Open:
  const [currMessageId, setCurrMessageId] = React.useState('');

  // Which type of message is currently opened (thread or DM)
  const [dmOpened, toggleDmOpened] = React.useState(false);

  // User Green Dot Status
  const [isActive, toggleActive] = React.useState(true);

  // Text Input States ---
  const [msgInput, setMsgInput] = React.useState('');
  const [msgInput2, setMsgInput2] = React.useState('');
  const [threadInput, setThreadInput] = React.useState('');

  // Current location of User
  const [currWorkspace, setCurrWorkspace] = React.useState('null');
  const [currChannel, setCurrChannel] = React.useState('null');
  const [currDm, setCurrDm] = React.useState(false);
  const [currThread, setThread] = React.useState(null);

  // Workspaces and Channels Backend ---
  const [workspacesAndChannels, setWorkspacesAndChannels] =
    React.useState([]);
  const [threadsAndReplies, setThreadsAndReplies] =
    React.useState([]);

  // DMs Backend ---
  const [dms, setDms] = React.useState([]);

  const [currMain, setMain] = React.useState(false);

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
    fetchThreadsAndReplies(workspacesAndChannels,
      setThreadsAndReplies, newChannel);
  };

  // Text Input Functions ---
  const handleMsgChange = (event) => {
    // handler for a change in the username to send a message to
    setMsgInput(event.target.value);
  };
  const handleMsgChange2 = (event) => {
    // handler for a change in the message to create a new dm
    setMsgInput2(event.target.value);
  };
  const msgFunction = () => () => {
    createNewDM(setDms);
  };
  const handleThreadChange = (event) => {
    setThreadInput(event.target.value);
  };
  const threadFunction = () => () => {
    postReply(setThreadsAndReplies, setDms);
  };

  /**
 * @param {messages} messages
 * @param {bool} bool
 * @param {bool} isDm var to denote whether message we opened is thread or dm
 */
  function threadHandler(messages, bool, isDm) {
    setCurrMessageId(messages[0].id);
    // setMobileChannelsOpen(false);
    if (isDm) {
      setCurrDm(true);
      toggleDmOpened(true);
    } else {
      setCurrDm(false);
      toggleDmOpened(false);
    }
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
      output = emailDate.getHours() + ':' + emailDate.getMinutes();
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

  const mainMessage = (convo, isDm) => (
    <div>
      <ListItem
        key={'ID'}
        button
        onClick={() => threadHandler(convo.messages, true, isDm)}
      >
        <ListItemAvatar>
          <Badge
            variant="dot"
            color="secondary"
            invisible={false}
          >
            <Avatar>
              {convo.otherUser[0]}
            </Avatar>
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={convo.otherUser +
            '  /  ' + convertDate(convo.messages[convo.messages.length-1].time)}
          secondary={convo.messages[convo.messages.length-1].content}
        />
      </ListItem>
    </div>
  );

  const mainMessageTable = (
    <List
      onClick = {() => setMain(true)}
      className = {classes.mainTableSize}
    >
      {threadsAndReplies.map(
        (convo) =>
          mainMessage(convo, false),
      )}
    </List>
  );

  const DMDisplay = (
    <List
      onClick = {() => setMain(false)}
      className = {classes.mainTableSize}
    >
      {dms.map(
        (convo) =>
          mainMessage(convo, true),
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
    <List onClick = {() => setMain(true)}>
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
          Direct Messages
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
        <div className={classes.searchBuffer}/>
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

  // create a new DM with another user; if the DM already exists, simply send
  // a message to them
  const createNewDM = (setDms) => {
    const item = localStorage.getItem('user');
    if (!item || msgInput === '' || msgInput2 === '') {
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';
    const newDM = JSON.stringify({content: msgInput2});

    fetch('/v0/dms/' + msgInput, {
      method: 'post',
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: newDM,
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setMsgInput('');
        setMsgInput2('');

        for (const dm of dms) {
          if (dm.otherUser === msgInput) {
            delete json.replies;
            dm.messages.push(json);
            setDms(dms);
            return;
          }
        }
        dms.push(json);
        setDms(dms);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // create a new thread and add it to the current list of threads
  const postReply = (setThreadsAndReplies, setDms) => {
    const item = localStorage.getItem('user');
    if (!item) {
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';
    const reply = JSON.stringify({content: threadInput});
    fetch('/v0/reply/' + currMessageId, {
      method: 'post',
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: reply,
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        // based on whether we were replying to a dm or thread, add the new msg
        if (dmOpened) {
          // find the correct dm box in dms and add the new message
          for (const index in dms) {
            if (dms[index].messages[0].id === currMessageId) {
              delete json.replies;
              dms[index].messages.push(json);
              setDms(dms);
              break;
            }
          }
        } else {
          // we are viewing a thread, so add the new message to the threads arr
          for (const index in threadsAndReplies) {
            if (threadsAndReplies[index].messages[0].id === currMessageId) {
              delete json.replies;
              threadsAndReplies[index].messages.push(json);
              setThreadsAndReplies(threadsAndReplies);
              break;
            }
          }
        }
        // clear input in text field
        setThreadInput('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    checkLoggedIn();
    fetchWorkspacesAndChannels(setWorkspacesAndChannels,
      setCurrWorkspace, setCurrChannel);
    fetchDMs(setDms);
  }, []);

  // Find first channel of new WS
  React.useEffect(() => {
    workspacesAndChannels.map((workspace)=>{
      if (workspace.workspaceName === currWorkspace) {
        changeChannel(undefined);
        if (! workspace.channels[0]) {
          setCurrChannel(null);
        } else {
          setCurrChannel(workspace.channels[0].channelName);
        }
      };
    });
    // setCurrChannel(currChannel);
  }, [currWorkspace]);

  React.useEffect(() => {
    // I need the below to instantiate the threads...
    fetchThreadsAndReplies(workspacesAndChannels,
      setThreadsAndReplies, currChannel);
  }, [currChannel]);

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
              classes={{paper: classes.workspaceDrawerSize}}
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
              primary={!currMain ? 'Direct Message' : currChannel}
            />
          </ListSubheader>
          {currMain ? mainMessageTable : DMDisplay}
          <TextField
            label={'User to send to...'}
            size="small"
            variant="outlined"
            multiline
            value={msgInput}
            className={classes.mainTextField2}
            onChange={handleMsgChange}
          />
          <TextField
            label={'Message to send...'}
            size="small"
            variant="outlined"
            multiline
            value={msgInput2}
            className={classes.mainTextField}
            onChange={handleMsgChange2}
            InputProps={{
              endAdornment:
              <InputAdornment position="end">
                <IconButton
                  color={theme.palette.primary.dark}
                  edge="end"
                  // Sends msg to channel v
                  onClick={msgFunction()}>
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
                    onClick={toggleThread(false)}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap className={classes.title}>
                    {currDm ? 'Direct Message' : currChannel}
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
                value={threadInput}
                onChange={handleThreadChange}
                InputProps={{
                  endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      color="inherit"
                      edge="end"
                      // Sends msg to thread v
                      onClick={threadFunction()}>
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
