const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express')
const cors = require('cors')({origin: true});
const app = express()
const superagent = require('superagent')
const { v4: uuidv4 } = require('uuid');

exports.getOrders = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        superagent
        .get('https://api.squarespace.com/1.0/commerce/orders')
        .set('Authorization', `Bearer ${functions.config().squarespace.key}`)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('User-Agent', 'butter-crumnble-admin')
        .then(sqsRes => {
            res.json({result: sqsRes.body});
        })
        .catch(err => {
            console.log(err)
        });
    });
});

exports.getProducts = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        superagent
        .get('https://api.squarespace.com/1.0/commerce/products')
        .set('Authorization', `Bearer ${functions.config().squarespace.key}`)
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('User-Agent', 'butter-crumnble-admin')
        .then(sqsRes => {
            res.json({result: sqsRes.body});
        })
        .catch(err => {
            console.log(err)
        });
    });
});
