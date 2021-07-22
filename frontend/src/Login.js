/**
 * Login.js - contains input fields for logging in with email and password
 * and links it with the backend database
 */

/**
 * NOTE: This whole file is merely a modified copy of Login.js from
 * the Authenticated Books Example
 *
 * Sources Used:
 *  Centering a div on the page:
 *    https://www.w3schools.com/css/css_align.asp
 *
 *  Text Field Component Types:
 *    https://codesandbox.io/s/df23c?file=/demo.js:739-765
 *    https://material-ui.com/components/text-fields/
 *
 *
 */

import React from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    'margin': '0',
    'position': 'absolute',
    'top': '35%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)',
  },
  title: {
    'text-align': 'center',
    'margin': '10px',
  },
  input: {
    padding: '5px 5px 5px 5px',
  },
  submit: {
    margin: '5px',
    float: 'right',
  },
}));

/**
 * contain input fields for user to login and authenticate
 * @return {component} input fields for user email and password to login
 */
function Login() {
  const classes = useStyles();
  const [user, setUser] = React.useState({username: '', password: ''});
  const history = useHistory();

  /**
   * check if user is signed in and redirect immediately to /home page if true
   */
  function checkLoggedIn() {
    const item = localStorage.getItem('user');
    if (item) {
      // go back to the home page
      history.push('/home');
    }
  };

  // call functions when page is loaded in
  React.useEffect(() => {
    checkLoggedIn();
  }, []);

  // update user object state when input field changes
  const handleInput = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // attempt to sign in by making a POST request with the name and password
    fetch('/authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // if we got a bad result, throw it
        if (!res.ok) {
          throw res;
        }
        // else return the valid result in JSON
        return res.json();
      })
      .then((json) => {
        // if we got a valid sign in, save the returned object in localStorage
        localStorage.setItem('user', JSON.stringify(json));
        // go back to main screen
        history.push('/home');
      })
      .catch((err) => {
        console.log(err);
        alert('Error logging in, please try again');
      });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={onSubmit}>
        <Typography className={classes.title} variant="h4">Login</Typography>

        {/* Username input field */}
        <TextField required id="standard-required" label="Username" size="small"
          name="username" variant="outlined" className={classes.input}
          onChange={handleInput}/>

        {/* Password input field */}
        <TextField required id="standard-password-input" label="Password"
          size="small" name="password" variant="outlined"
          className={classes.input} onChange={handleInput} type="password"/>

        <Button type="submit" value="Submit" variant="contained"
          className={classes.submit}>
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default Login;
