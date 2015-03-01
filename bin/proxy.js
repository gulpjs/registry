var registry = require('../');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2));

if (!argv.port) argv.port = 80;
if (!argv.es) argv.es = 'http://localhost:9200/npm';

var server = registry.createServer(argv);
server.listen(argv.port, function(){
  console.log('Listening on', argv.port, 'and directing traffic to', argv.es);
});