const clientOauth = require('client-oauth2');
const bodyParse = require('body-parser');
const request = require('request');
const express = require('express');
const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors');
const fs = require('fs');

const CLIENT_KEY = fs.readFileSync('./keys/client_key');
const SECRET_KEY = fs.readFileSync('./keys/secret_key');

const DB_URL = 'mongodb://localhost:27017/';
const API_URL = 'https://api.twitter.com';

const APP_PORT = 8080;
const app = express();

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : true}));
app.use(cors());

app.listen(APP_PORT, (err, res) => {
    console.log('Server started on:'+APP_PORT);
});

app.get('/', (req, res) => {
    res.send('Invalid endpoint.');
});

app.get('/wake', (req, res) => {
    res.send('I\'m awake');
});


mongo.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;

    let db = client.db('tweets');
    getUserToken()
        .then(data => {
            let token = data.access_token;
            let current_id = 0;
            setInterval(() => {
                Request('GET', '/1.1/search/tweets.json',
                    {   q : 'ManoChildfocusRun',
                        result_type : 'recent',
                        count : 50,
                        tweet_mode : 'extended',
                        since_id : current_id
                    },
                    { "Authorization" : "Bearer " + token })
                    .then(data => { console.log(data) })
                    .catch(console.error);
            }, 10000);
        })
        .catch(console.error);
});

function getUserToken() {
    return new Promise((resolve, reject) => {
        Request('POST', '/oauth2/token',
            { grant_type : "client_credentials" },
            { 
                "Authorization" : "Basic " + encodeConsumerToken(),	
                "Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8"
            })
        .then(resolve)
        .catch(reject);
    });
}

function Request(method, path, params = {}, headers = {}){	
    return new Promise((resolve, reject) => {	
         let options = {	
            method,	
            url: API_URL + path,	
            qs : params,	
            headers	
        }	
        request(options, (err, res, body) => {	
            if (err){ reject(err) };
            
            resolve(JSON.parse(body));	
        });	
    });	
}

function encodeConsumerToken(){	
    return Buffer.from(encodeRFC(CLIENT_KEY) + ":" + encodeRFC(SECRET_KEY)).toString('base64');	
}	

function encodeRFC (str) {	
    return encodeURIComponent(str)	
        .replace(/!/g, '%21')	
        .replace(/'/g, '%27')	
        .replace(/\(/g, '%28')	
        .replace(/\)/g, '%29')	
        .replace(/\*/g, '%2A')	
}

class Tweets {
    constructor(username, avatar, text, url){
        this.username = username;
        this.avatar = avatar;
        this.text = text;
        this.url = url;
    }
}
