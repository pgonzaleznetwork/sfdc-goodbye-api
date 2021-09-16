let {restAPI} = require('sfdc-happy-api')();
let fetch = require('node-fetch');
const csv = require('csvtojson');
const { convertArrayToCSV } = require('convert-array-to-csv');
let fs = require('fs');

async function findVersions(connection){

    let offendingUserIds = new Set();

    let restApi = restAPI(connection,logError);

    let query = `SELECT LogFile, EventType, CreatedDate FROM EventLogFile WHERE EventType IN ('API', 'RestApi', 'ApiTotalUsage') AND CreatedDate = LAST_N_DAYS:7 ORDER BY CreatedDate Desc`;
    let soqlQuery = {query};

    let rawResults = await restApi.query(soqlQuery);

    let logFileUrls = rawResults.records.map(result => {
        return `${connection.url}${result.LogFile}`;
    })

    let options = getFetchOptions(connection.token);

    let restLogs = [];
    let soapLogs = [];

    let data = await Promise.all(

        logFileUrls.map(async (logUrl) => {

            let res = await fetch(logUrl,options);
            let text = await res.text()

            const logs = await csv({
                noheader:true,
                output: "csv"
            }).fromString(text);

            logs.forEach(log => {
                let logType = log[0];

                if(logType == 'ApiTotalUsage'){
                    let versionNumber = parseInt(log[6]);
                    if(versionNumber <= connection.apiThreshold){
                        restLogs.push(log);
                    }
                    const userId = log[4];
                    offendingUserIds.add(userId);
                }

                if(logType == 'RestApi'){

                    let endpoint = log[7];
                    let index = endpoint.indexOf('/v');
                    let versionNumber = endpoint.substring(index+2,index+4);

                    versionNumber = parseInt(versionNumber);

                    if(versionNumber <= connection.apiThreshold){
                        restLogs.push(log);
                    }
                }
                else if(logType == 'API'){

                    let versionNumber = parseInt(log[13]);

                    if(versionNumber <= connection.apiThreshold){
                        soapLogs.push(log);
                    }
                }
            })
        })
    );

    const restLogsCsv = convertArrayToCSV(restLogs, {
        header:getRestHeader(),
        separator: ''
    });

    const soapLogsCsv = convertArrayToCSV(soapLogs, {
        header:getSoapHeader(),
        separator: ''
    });

    const offendingUsersArr = Array.from(offendingUserIds);

    fs.writeFileSync('results/restLogs.csv',restLogsCsv);
    fs.writeFileSync('results/soapLogs.csv',soapLogsCsv);
    fs.writeFile('results/offendingUsers.json', JSON.stringify(offendingUsersArr), function (err) {
        if (err) {
            console.error('Something bad happened writing the user file');
        }
    });
}


function getFetchOptions(token){
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
    }
}

function logError(error){
    console.log(error);
}

function getRestHeader(){

    let restHeader = [
        'EVENT_TYPE',      'TIMESTAMP',
        'REQUEST_ID',      'ORGANIZATION_ID',
        'USER_ID',         'RUN_TIME',
        'CPU_TIME',        'URI',
        'SESSION_KEY',     'LOGIN_KEY',
        'REQUEST_STATUS',  'DB_TOTAL_TIME',
        'METHOD',          'MEDIA_TYPE',
        'STATUS_CODE',     'USER_AGENT',
        'ROWS_PROCESSED',  'NUMBER_FIELDS',
        'DB_BLOCKS',       'DB_CPU_TIME',
        'REQUEST_SIZE',    'RESPONSE_SIZE',
        'ENTITY_NAME',     'TIMESTAMP_DERIVED',
        'USER_ID_DERIVED', 'CLIENT_IP',
        'URI_ID_DERIVED'
      ];

      return restHeader;
}

function getSoapHeader(){

    let soapHeader = [
        'EVENT_TYPE',        'TIMESTAMP',
        'REQUEST_ID',        'ORGANIZATION_ID',
        'USER_ID',           'RUN_TIME',
        'CPU_TIME',          'URI',
        'SESSION_KEY',       'LOGIN_KEY',
        'REQUEST_STATUS',    'DB_TOTAL_TIME',
        'API_TYPE',          'API_VERSION',
        'CLIENT_NAME',       'METHOD_NAME',
        'ENTITY_NAME',       'ROWS_PROCESSED',
        'REQUEST_SIZE',      'RESPONSE_SIZE',
        'DB_BLOCKS',         'DB_CPU_TIME',
        'TIMESTAMP_DERIVED', 'USER_ID_DERIVED',
        'CLIENT_IP',         'URI_ID_DERIVED'
      ];

      return soapHeader;
}

module.exports = findVersions;