const nodeAbi = require('node-abi');

console.log("node:" + nodeAbi.getAbi('13.8.0', 'node'));
console.log("electron:" + nodeAbi.getAbi('8.0.1', 'electron'));
