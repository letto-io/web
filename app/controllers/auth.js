var request = require('request');

function login(req, res, next) {
  request(
    {
      uri: 'http://rws-edupanel.herokuapp.com/session',
      method: 'POST',
      json: {
        email: req.body.email,
        password: req.body.password
      }
    }, function (error, response, body) {
      if (response.statusCode == 401) {
        res.status(401);
        res.end();
      }
      else {
        res.cookie('session', body);
        res.end();
      }
    }
  );
}

function logout(req, res, next) {
  console.log('logout');
}

module.exports = function() {
  return {
    login: login,
    logout: logout
  };
};
