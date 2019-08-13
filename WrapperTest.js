const OpenVZ = require("./OpenVZFW.js");
const readline = require('readline');

var fw = new OpenVZ();
var ReadLine = readline.createInterface(process.stdin, process.stdout);

ReadLine.setPrompt('> ');
ReadLine.prompt();
ReadLine.on('line', (line) => {
	fw.run_command(line);
    ReadLine.prompt();
}).on('close', () => { process.exit(0); });