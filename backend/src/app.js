const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const dmstream = require('./dmstream');
const auth = require('./auth');
const workspace = require('./workspace');
const messages = require('./messages');
const channel = require('./channel');
const dummy = require('./dummy');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

// for handling a user trying to sign in
app.post('/authenticate', auth.authenticate);

app.use(
    OpenApiValidator.middleware({
      apiSpec: apiSpec,
      validateRequests: true,
      validateResponses: true,
    }),
);

app.get('/v0/dummy', dummy.get);
// Your routes go here
app.get('/v0/dms', auth.check, dmstream.getAllDMs);
app.post('/v0/dms/:userName', auth.check, dmstream.createDM);
app.get('/v0/workspace', auth.check, workspace.getWorkspacesAndChannels);
app.get('/v0/channel/:id', auth.check, channel.getThreadsAndReplies);
app.post('/v0/channel/:id', auth.check, channel.createThread);
app.post('/v0/reply/:id', auth.check, messages.createReply);

app.use((err, req, res, next) => {
  console.log('Message: ' + err);
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
