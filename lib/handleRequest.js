var url = require('url');

// keep-alive causes connection bleedover sometimes
// no reason for it here
var bounceOpt = {
  headers: {
    Connection: 'close'
  }
};

// dont even bother forwarding these
var blocked = ['favicon.ico', 'robots.txt'];

// url.resolve resolves / to root which sucks
var sanitize = function(uri) {
  uri = url.parse(uri).path;
  if (uri[0] === '/') return uri.slice(1);
  return uri;
};

module.exports = function(opt) {
  return function(req, res, bounce){
    var sanitized = sanitize(req.url);

    // dont allow people to modify the DB
    if (req.method !== 'GET') {
      res.statusCode = 405;
      res.end('GET is the only allowed method');
      return;
    }

    // blacklist crappy urls
    if (blocked.indexOf(sanitized) !== -1) {
      res.statusCode = 404;
      res.end();
      return;
    }

    var uri = url.resolve(opt.es, sanitized);
    bounce(uri, bounceOpt);
  };
};