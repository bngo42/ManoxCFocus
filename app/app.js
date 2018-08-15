const clientOAuth = require('client-oauth2');
const request = require('request');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const CONSUMER_CLIENT = "vHEJO9gXgGFC8V3FgjONGK1XH";
const CONSUMER_SECRET = "n66gFPmG8m0860tMzHkTTpLPx3SBUuv6oIzSyjgfhRR8PZonRb";

const CLIENT_ID = "2940841962-ANLNOAlddb73flugvEbpt15ubge8zyByYtfuG2l";
const SECRET_ID = "StOQU5TyMqT01TCy5pRjTmqrLLcJgISZZcSE1WsIibiAf";

const baseUrl = "https://api.twitter.com";

const app = express();
const PORT = 8080;

let token = "";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.listen(PORT);

app.use('/hashtag/:tag', (req, res) => {

    let tag = req.params.tag;

    getToken()
        .then(() => {
            doRequest('GET', '/1.1/search/tweets.json', {
                q : tag
            })
                .then(data => {
                    res.send(data);
                })
                .catch(console.error);
        })
        .catch(console.error);
});



function getToken(){
    return new Promise((resolve, reject) => {
        let options = {
            method : "POST",
            url: baseUrl + '/oauth2/token',
            qs : { grant_type : "client_credentials" },
            headers : {
                "Authorization" : "Basic " + encodeConsumerToken(),
                "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8"
            }
        }
        request(options, (err, res, body) => {
            if (err){ reject(err) };

            let data = JSON.parse(body);
            token = data.access_token;
            resolve();
        });
    });
}


function doRequest(method, path, params = {}){
    return new Promise((resolve, reject) => {
        if (!token){
            reject("Invalid Token");
        }

        let options = {
            method,
            url: baseUrl + path,
            qs : params,
            headers : {
                "Authorization" : "Bearer " + token
            }
        }
        request(options, (err, res, body) => {
            if (err){ reject(err) };
            resolve(JSON.parse(body));
        });
    });
}


function encodeConsumerToken(){
    return Buffer.from(encodeRFC(CONSUMER_CLIENT) + ":" + encodeRFC(CONSUMER_SECRET)).toString('base64');
}

function encodeRFC (str) {
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
}