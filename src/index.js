let findVersions = require('../lib/findVersions');

let connection = {
    token: 'dddSUzDF9v02J7uLXungygyPXTew7lEOkB5V54Yy9FgJkGQqZIWWexyd67',
    url:'https://mydomain.my.salesforce.com',
    apiVersion:'50.0',
    apiThreshold:21
};

console.log('Starting...');
findVersions(connection).then(()=> console.log('Done! Check the log files in the results/ folder'))
