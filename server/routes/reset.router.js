require('dotenv').config()

const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../modules/pool.js');
const path = require('path');
const nodemailer = require('nodemailer');
const Chance = require('chance')
chance = new Chance();

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET

    }
});



router.put('/', function (req, res) {
    console.log('REQ.BODY: ', req.body);


    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            done();
        } else {
            client.query("SELECT * FROM users WHERE email = $1", [req.body.email], function (errorMakingDatabaseQuery, result) {
                if (errorMakingDatabaseQuery) {
                    console.log('error', errorMakingDatabaseQuery);
                    done();
                }

                user = result.rows[0];

                if (!user) {
                    done();
                    res.sendStatus(404);
                } else {
                    var code = chance.string({ length: 16, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' });

                    client.query('UPDATE users SET code = $1 WHERE email = $2;', [code, req.body.email], function (err, result) {
                        done();
                        if (err) {
                            console.log('query err ', err);
                            res.sendStatus(500);
                        } else {
                            let mailOptions = {
                                from: '"Hustle" <startyourhustle@gmail.com>',
                                to: req.body.email,
                                subject: `HUSTLE: Password Reset`,
                                html: `<h1>Hello!!</h1><h3>Use the following link to reset your password:</h3>
                                <ul><a href="http://localhost:5000/#/reset/password?code=${code}">Click Here</a></ul>
                                    <p>Thank you</p>`,
                                auth: {
                                    user: 'startyourhustle@gmail.com',
                                    refreshToken: process.env.NODEMAILER_REFRESHTOKEN,
                                    accessToken: process.env.NODEMAILER_ACCESSTOKEN
                                }
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                    res.send(error);
                                }
                                console.log('Email sent: ', info.response);
                                res.sendStatus(200);
                            });
                            res.sendStatus(200);
                        }
                    });
                }
            });
        }
    });
});

router.put('/password', function (req, res) {
    console.log('Query', req.query);
    console.log('Body', req.body);
    
    
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`PUT SQL HERE`, [],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                })
        }
    })
});

module.exports = router;
