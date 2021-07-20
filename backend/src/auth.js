const jwt = require('jsonwebtoken');
const secrets = require('./db_secretToken');
var users = require('./db_users');

// handle signing in/validating username and password combo
exports.authenticate = async (req, res) => {
  const { username, password } = req.body;
  const key = await secrets.getSecretKey();

  // see if there's a username and password that matches
  // in the database, and save result (JSON object)
  const user = await users.checkLogin(username, password);

  // if the login combo was a match, then issue a JS Web Token
  // to the browser with the username
  if (user) {
    const accessToken = jwt.sign(
      {username: user.userName, id: user.id}, 
      key, {
        // set expiration time that works for both frontend and backend
        expiresIn: '30m',
        algorithm: 'HS256'
      });
    res.status(200).json({userName: user.userName, accessToken: accessToken, id: user.id});
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

// check to see if browser has authorization and if it's valid,
// save the user name in the req field for GET, POST, etc. methods 
exports.check = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const key = await secrets.getSecretKey();
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, key, (err, user) => {
      if (err) {
        console.log('invalid check');
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    console.log('valid check');
    res.sendStatus(401);
  }
};


