let findVersions = require('../lib/findVersions');

let connection = {
    token: '00D300000000FHi!AQsAQGs2zbatIN9iWzOqzSvKfgG65XUwibUIjyozvufydxFxkHu6H04BC9IIK8xiPFch7DBR_22vi214emINu33L6lup22.J',
    url:'https://guidewire.my.salesforce.com',
    apiVersion:'50.0',
    apiThreshold:20
};

findVersions(connection);
