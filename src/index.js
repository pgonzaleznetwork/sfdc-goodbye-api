let findVersions = require('../lib/findVersions');

let connection = {
    token: '00D300000000FHJ',
    url:'https://anything.my.salesforce.com',
    apiVersion:'50.0',
    apiThreshold:20
};

findVersions(connection);
