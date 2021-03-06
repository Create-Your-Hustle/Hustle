require('dotenv').config()

const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../modules/pool.js');
const path = require('path');
const nodemailer = require('nodemailer');
const Chance = require('chance');
const encryptLib = require('../modules/encryption');
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
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            done();
        } else {
            client.query("SELECT * FROM users WHERE username = $1", [req.body.email], function (errorMakingDatabaseQuery, result) {
                if (errorMakingDatabaseQuery) {
                    done();
                }

                user = result.rows[0];

                if (!user) {
                    done();
                    res.sendStatus(404);
                } else {
                    var code = chance.string({ length: 16, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' });

                    client.query('UPDATE users SET code = $1 WHERE username = $2;', [code, req.body.email], function (err, result) {
                        done();
                        if (err) {
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
                                    res.send(error);
                                }
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
    var password = encryptLib.encryptPassword(req.body.password);

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
            client.query(`UPDATE users SET password=$1 WHERE code=$2 AND code IS NOT NULL`, [password, req.query.code],
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
