var registry = require('../');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));

if (!argv.port) throw 'Missing --port option';
if (!argv.es) throw 'Missing --es option';

var server = registry.createServer(argv);
server.listen(argv.port, function(){
  console.log('Listening on', argv.port, 'and directing traffic to', argv.es);
});