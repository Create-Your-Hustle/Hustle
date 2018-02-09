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
            client.query(`SELECT users.username, users.display_name, users.user_picture, skills.skill_name, users_skills.skill_rating, users.user_city, users.user_state, users.user_remote,
                users.user_for_pay, users.user_for_trade, users.user_bio, users.user_weekly_min, users.user_weekly_max, users_skills.skill_id, users_skills.user_id FROM users
                LEFT JOIN users_skills ON users.id=users_skills.user_id
                LEFT JOIN skills ON users_skills.skill_id=skills.skill_id
                WHERE users.username = $1;`, [req.query.name], function (errorMakingDatabaseQuery, result) {
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



  router.put('/profilePicture', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE users SET user_picture=$1  WHERE id=$2;`, [req.body.user_picture, req.user.id],
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



// Get all info for collaborator search page
router.get('/search/all', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {

                client.query(`SELECT string_agg(s.skill_name, ', ') AS skill_list, u.*
                            FROM users u
                            LEFT JOIN users_skills us ON u.id = us.user_id
                            LEFT JOIN skills s ON s.skill_id = us.skill_id
                            GROUP BY u.id;`, function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                }); // end query
            }
        });
    } else {
        res.sendStatus(401);
    }
}); // end collaborator/search/all get

// Main collaborator post
router.post('/skill', function (req, res) {
    if (req.isAuthenticated) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`INSERT INTO users_skills (user_id, skill_id, skill_rating)
                VALUES ($1, $2, $3);`, [req.user.id, req.body.skill_id, req.body.skill_rating], function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500)
                    } else {
                        res.sendStatus(201);
                    }
                });
            }
        })
    };
}); // end collaborator post

// Main collaborator put
router.put('/username', function (req, res) {
    if (req.isAuthenticated()) {

        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`UPDATE users SET display_name = $1, user_bio = $2 WHERE id = $3`, [req.body.displayName, req.body.user_bio, req.user.id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
            }
        });
    }
}); // end collaborator put

router.put('/preferences', function (req, res) {
    if (req.isAuthenticated()) {

        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`UPDATE users SET user_city = $1, user_state = $2, user_remote = $3, user_for_pay = $4, user_for_trade = $5, 
                                user_weekly_min = $6, user_weekly_max = $7 WHERE id = $8`,
                    [req.body.user_city, req.body.user_state, req.body.user_remote, req.body.user_for_pay, req.body.user_for_trade,
                    req.body.user_weekly_min, req.body.user_weekly_max, req.user.id], function (errorMakingDatabaseQuery, result) {
                        done();
                        if (errorMakingDatabaseQuery) {
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(201);
                        }
                    });
            }
        });
    }
});

// Main collaborator delete
router.delete('/skill', function (req, res) {
    if (req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                console.log('error', errorConnectingToDatabase);
                res.sendStatus(500);
            } else {
                client.query(`DELETE FROM users_skills WHERE user_id = $1 AND skill_id = $2`, [req.user.id, req.query.skill_id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
            }
        })
    } else {
        res.sendStatus(401)
    }
}); // end collaborator delete

// Collaborator search get
router.get('/search', function (req, res) {
    console.log(req.query);
    let display_name = req.query.display_name;
    if (display_name !== '') {
        display_name = `%` + req.query.display_name + `%`
    };

    let skill_params = req.query.skills; 

    let sql_params = ''
    for (let i = 0; i < skill_params.length; i++) {
        const element = skill_params[i];
        sql_params += ('$' + (i + 2));
        if (i < skill_params.length - 1) {
            sql_params += ', '
        };
    };
    console.log(display_name, 'is the name', skill_params, 'are the skills', sql_params, 'are the sql params');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`WITH name_search AS (
                            SELECT string_agg(s.skill_name, ', ') AS skill_list, u.*, 1 as order_priority
                                FROM users u
                                LEFT JOIN users_skills us ON u.id = us.user_id
                                LEFT JOIN skills s ON s.skill_id = us.skill_id
                            WHERE u.display_name ILIKE $1
                            GROUP BY u.id
                            ),
                            skill_search AS (
                            SELECT string_agg(s.skill_name, ', ') AS skill_list, u.*, 1 as order_priority
                                FROM users u
                                LEFT JOIN users_skills us ON u.id = us.user_id
                                LEFT JOIN skills s ON s.skill_id = us.skill_id
                            WHERE s.skill_name IN (${sql_params})
                            GROUP BY u.id
                            )
                        SELECT *
                        FROM name_search
                        UNION
                        SELECT *
                        FROM skill_search
                        ORDER BY order_priority;`, [display_name, ...skill_params], function (errorMakingDatabaseQuery, result) {
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

//get collaborator by id
router.get('/select/id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // this query needs to be changed to include concatonated skills
            client.query(`SELECT users.username, users.display_name, users.user_picture, skills.skill_name, users_skills.skill_rating, users.user_city, users.user_state, users.user_remote,
                users.user_for_pay, users.user_for_trade, users.user_bio, users.user_weekly_min, users.user_weekly_max, users_skills.skill_id, users_skills.user_id FROM users
                LEFT JOIN users_skills ON users.id=users_skills.user_id
                LEFT JOIN skills ON users_skills.skill_id=skills.skill_id
                WHERE users.id = $1;`, [req.query.id], function (errorMakingDatabaseQuery, result) {
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


module.exports = router;