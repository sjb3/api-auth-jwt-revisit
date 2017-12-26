'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');

// initialise the app variable
const app = express();

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

// add middleware function verify
// post route not working, missing something?

app.post('/api/posts', verifyToken, (req, res) => {
  jwr.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post route created',
        authData
      });
    }
  })

});

app.get('/api/login', (req, res) => {

  // Mock user
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.net'
  }

  jwt.sign({user}, 'secretkey', {expiresIn: '30s'}, (err, token) => {
    res.json({
      token
    });
  });
});


// Format Of Token
// Authorization: Bearer <access_token>

//Veryfy Token
function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if bearer is undefined
  if(typeof(bearerHeader) !== 'undefined') {

    // Split at the space
    const bearer = bearerHeader.split(' ');
    // get token from array
    const bearerToken = bearer[1];
    // set the token
    req.token = bearerToken;
    // next middleware
    next();

  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log('Server up and running at 5000'));
