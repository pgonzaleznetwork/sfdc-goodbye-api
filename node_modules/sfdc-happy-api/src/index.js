let soapAPI = require('../lib/soap');
let metadataAPI = require('../lib/metadata');
let restAPI = require('../lib/rest');
let reportsAPI = require('../lib/reports');

/**
 * Returns all the salesforce APIs as functions
 */
function happyApi(){

    return {
        soapAPI,
        metadataAPI,
        restAPI,
        reportsAPI
    }

}

module.exports = happyApi;