var url = require('url');

// keep-alive causes connection bleedover sometimes
// no reason for it here
var bounceOpt = {
  headers: {
    Connection: 'close'
  }
};

// url.resolve resolves / to root which sucks
var sanitize = function(url) {
  if (url[0] === '/') return url.slice(1);
  return url;
};

module.exports = function(opt) {
  return function(req, res, bounce){
    // dont allow people to modify the DB
    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.end('GET is the only allowed method');
      return;
    }

    var sanitized = sanitize(req.url);
    var uri = url.resolve(opt.es, sanitized);

    bounce(uri, bounceOpt);

    console.log(req.method, sanitized, 'bounced to', uri);
  };
};