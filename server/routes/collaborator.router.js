const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../modules/pool.js');
const path = require('path');


// Main collaborator get
router.get('/select', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // this query needs to be changed to include concatonated skills
            client.query(`SELECT users.username, users.user_picture, skills.skill_name, users_skills.skill_rating, users.user_city, users.user_state, users.user_remote,
                users.user_for_pay, users.user_for_trade, users.user_bio FROM users
                LEFT JOIN users_skills ON users.id=users_skills.user_id
                LEFT JOIN skills ON users_skills.skill_id=skills.skill_id
                WHERE users.username = $1;`,[req.query.name], function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    console.log('error', errorMakingDatabaseQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
}); // end collaborator get

router.get('/search/all', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // this query needs to be changed to include concatonated skills
            client.query(`SELECT * FROM users
                        LEFT JOIN users_skills ON users.id=users_skills.user_id
                        LEFT JOIN skills ON users_skills.skill_id=skills.skill_id;`, function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    console.log('error', errorMakingDatabaseQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

// Main collaborator post
router.post('/', function (req, res) {

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`PUT SQL HERE`, [], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
}); // end collaborator post

// Main collaborator put
router.put('/', function (req, res) {

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`PUT SQL HERE`, [], function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
}); // end collaborator put

// Main collaborator delete
router.delete('/', function (req, res) {

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`PUT SQL HERE`, [], function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    console.log('error', errorMakingDatabaseQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
}); // end collaborator delete

// Collaborator search get
router.get('/search', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`PUT SQL HERE`, function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
                    console.log('error', errorMakingDatabaseQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
}); // end collaborator search get


module.exports = router;