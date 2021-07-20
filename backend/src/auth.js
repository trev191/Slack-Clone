/**
 * Sources Used
 *  Function to hash a password asynchronously with bcrypt:
 *    https://coderrocketfuel.com/article/using-bcrypt-to-hash-and-check-passwords-in-node-js#hash-a-password
 *    https://stackoverflow.com/questions/48799894/trying-to-hash-a-password-using-bcrypt-inside-an-async-function
 *
 *  Using fixed salt value to prevent hash function from generating
 *  different hashes when database restarts:
 *    https://stackoverflow.com/questions/53588419/hashing-pattern-changes-every-time-the-server-restarts
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secrets = require('./db_secretToken');
var users = require('./db_users');

// helper function to hash a password and return the hashed string
exports.hashPassword = async (password) => {
  const salt = '$2b$10$NWRUkWNTCvaW8fBMe59.6ev47FOAJ9GATcaOWugGn.knKqHXLfp8W';
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        reject(err);
      } 
      resolve(hash);
    });
  })

  return hashedPassword;
}

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
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


