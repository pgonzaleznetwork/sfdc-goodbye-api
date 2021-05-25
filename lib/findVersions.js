let {restAPI} = require('sfdc-happy-api')();
let fetch = require('node-fetch');
const csv = require('csvtojson');
const { convertArrayToCSV } = require('convert-array-to-csv');
let fs = require('fs');

async function findVersions(connection){

    let restApi = restAPI(connection,null);

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

        logFileUrls.map(async (oneUrl) => {

            let res = await fetch(oneUrl,options);
            let text = await res.text()
    
            const jsonArray = await csv({
                noheader:true,
                output: "csv"
            }).fromString(text);
    
            jsonArray.forEach(el => {

                if(el[0] == 'RestApi'){
                    let endpoint = el[7];
                    let index = endpoint.indexOf('/v');
                    let versionNumber = endpoint.substring(index+2,index+4);
    
                    versionNumber = parseInt(versionNumber);
    
                    if(versionNumber <= connection.apiThreshold){
                        restLogs.push(el);
                    }
                }
                else if(el[0] == 'API'){

                    let versionNumber = parseInt(el[13]);

                    if(versionNumber <= connection.apiThreshold){
                        soapLogs.push(el);
                    }
                }
            }) 
        })
    );

    let header = [
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

    //console.log(restLogs);

    const restLogsCsv = convertArrayToCSV(restLogs, {
        header,
        separator: ''
    });

    const soapLogsCsv = convertArrayToCSV(soapLogs, {
        header,
        separator: ''
    });

    fs.writeFileSync('results/restLogs.csv',restLogsCsv);
    fs.writeFileSync('results/soapLogs.csv',soapLogsCsv);


}


function getFetchOptions(token){
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
    }
}


module.exports = findVersions;