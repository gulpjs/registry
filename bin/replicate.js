var registry = require('../');
var minimist = require('minimist');
var cp = require('child_process');
var resolve = require('resolve');

var argv = minimist(process.argv.slice(2));

if (!argv.npm) argv.npm = 'http://skimdb.npmjs.com/registry';
if (!argv.es) argv.es = 'http://localhost:9200/npm';

function startIt() {
  var mod = resolve.sync('npm2es/bin/npm2es.js');
  var args = [
    '--es', argv.es,
    '--couch', argv.npm
  ];
  console.log('Replicating data from', argv.npm, 'to', argv.es);
  var proc = cp.fork(mod, args, {stdio: 'inherit'});
  proc.once('close', function(){
    console.log('Replicator died, spinning up a new one');
    startIt();
  });
}

startIt();