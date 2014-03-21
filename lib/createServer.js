var bouncy = require('bouncy');
var handle = require('./handleRequest');

module.exports = function(opt){
  var server = bouncy(handle(opt));
  return server;
};