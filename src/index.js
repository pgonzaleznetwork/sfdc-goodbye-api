let findVersions = require('../lib/findVersions');

let connection = {
    token: process.env.token,
    url:process.env.url,
    apiVersion: process.env.apiVersion,
    apiThreshold: process.env.apiThreshold
};

console.log('Starting...');
findVersions(connection).then(()=> console.log('Done! Check the log files in the results/ folder'))
