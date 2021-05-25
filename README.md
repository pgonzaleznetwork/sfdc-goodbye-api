# sfdc-goodbye-api
## A simple script to find API calls on a specific API version

**YOU MUST HAVE EVENT MONITORING ENABLED TO USE THIS**

Salesforce recently announced that are deprecating the APIs on version 7.0 through 20.0 and they have provided instructions on how to identify applications making API calls into your org and what API version they are using.

[Salesforce Platform API Versions 7.0 through 20.0 Retirement](https://help.salesforce.com/articleView?id=000351312&type=1&mode=1)

The instructions though are **very long and require a lot of manual steps, copying pasting, using workbench or other API tool, etc.**

This script simplies the task and only requires 2 steps!

### Features

* **Specify API version threshhold** Want to see only API calls using version 30 and lower? one step! In the future, when salesforce deprecates more versions, you just need to update the configuration and run the script again!
* **REST and SOAP API** The logs are extracted for both the REST and SOAP APIs
* **csv results** The results are provided in CSV format so that you can put them in excel/gsheets and go through them

### Download the script

On your terminal, issue the following commands

```javascript
git clone https://github.com/pgonzaleznetwork/sfdc-goodbye-api

cd sfdc-goodbye-api

npm install
```

### Get an access token to your org

Use the API to get an access token to your org. You can use this free app https://www.appitek.com/tools/token-generator/

### Configure

Go to the source directory and open the `src/index.js` file. Then update the connection object with the details of your org

```javascript

let connection = {
    token: 'your token',
    url:'your instance url',
    apiVersion:'50.0',
    apiThreshold:30 << API VERSION THRESHOLD
};


```

The `apiThreshold` propery is the API version that you want to search for. The results will only include API calls made on this version or **lower**

So for example, to retrieve API logs using version 20 or lower (which is what Salesforce is deprecating at the time of this writing), simply specify the number 20, **NOT 20.0**

### Run the script

In the terminal, go back to the `sfdc-goodbye-api` directory and run the command `npm start`

### Results

The results will be in the `results` folder. 
