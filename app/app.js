const clientOAuth = require('client-oauth2');
const request = require('request');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const CLIENT_ID = "hb59CCe37NyrelYJJDRaAQdjBWkrQMKLDUjri1Ga";
const SECRET_ID = "53K6RI6D14KarvVZS1ZMjWFQMZESWddooNOcIt1w";

const baseUrl = "https://streamlabs.com/api/v1.0";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


doRequest('POST', '/token', {
    grant_type : 'authorization_code',
    code: 'SUnpIztgFgtHnsAcxTId1DTSDqonkx0PeBDefiTw',
    client_id: CLIENT_ID,
    client_secret: SECRET_ID,
    redirect_uri : 'https://localhost'
}).then(res => {
    console.log(res);
}).catch(console.error);


function doRequest(method, path, params){
    return new Promise((resolve, reject) => {
        let options = { method,
            url: baseUrl + path,
            qs: params
        };

        request(options, function (error, response, body) {
            if (error){
                reject(err);
            }
            resolve(body);
        });
    });
}