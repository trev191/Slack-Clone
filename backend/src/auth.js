const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// const secrets = require('./tempSecret');
const secrets = require('./db_secretToken');
var users = require('./tempUsers');

// handle signing in/validating user email and password combo
exports.authenticate = async (req, res) => {
  const key = await secrets.getSecretKey();
  const { email, password } = req.body;

  // see if there's a user email and password that matches
  // in the database, and save result (T/F)
  const user = users.find((user) => { 
    return user.email === email && 
    bcrypt.compareSync(password, user.password);
  });

  // if the login combo was a match, then issue a JS Web Token
  // to the browser
  if (user) {
    const accessToken = jwt.sign(
      {email: user.email, role: user.role}, 
      key, {
        // set expiration time that works for both frontend and backend
        expiresIn: '30m',
        algorithm: 'HS256'
      });
    res.status(200).json({name: user.name, accessToken: accessToken});
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

// check to see if browser has authorization and if it's valid,
// save the user name in the req field for GET, POST, etc. methods 
exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
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

