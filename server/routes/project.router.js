require('dotenv').config()

const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../modules/pool.js');
const path = require('path');
const nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: '360485416428-s79cfmrp2mgkkphdih1uc1oumc9j4su8.apps.googleusercontent.com',
        clientSecret: 'JFjG6jMjHRmP-CtPNrPWfo5c'

    }
});

//Main project get
router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT array_agg(s.skill_name) AS skill_list, p.* FROM projects p LEFT JOIN projects_skills ps ON p.project_id = ps.project_id LEFT JOIN skills s ON s.skill_id = ps.skill_id GROUP BY p.project_id;`, function (errorMakingDatabaseQuery, result) {
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

//Main project post
router.post('/', function (req, res) {

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`PUT SQL HERE`, [],
                function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500)
                    } else {
                        res.sendStatus(201);
                    }
                });
        }
    })
})

//Main project put
router.put('/', function (req, res) {

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

//Main project delete
router.delete('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`PUT SQL HERE`, [],
                function (errorMakingDatabaseQuery, result) {
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
});



//Project Search Get
router.get('/search', function (req, res) {
    console.log(req.query);
    let project_name = req.query.project_name;
    if (project_name !== '') {
        project_name = `%` + req.query.project_name + `%`
    };
    let skill_params = req.query.skills;
    let sql_params = ''
    for (let i = 0; i < skill_params.length; i++) {
        const element = skill_params[i];
        sql_params += ('$' + (i + 2));
        if(i < skill_params.length - 1){
            sql_params += ', '
        };
    };
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`WITH name_search AS (
                                SELECT array_agg(s.skill_name) AS skill_list, p.*, 1 AS order_priority
                                    FROM projects p
                                    LEFT JOIN projects_skills ps ON p.project_id = ps.project_id
                                    LEFT JOIN skills s ON s.skill_id = ps.skill_id
                                WHERE p.project_name ILIKE $1
                                GROUP BY p.project_id
                                ),
                                skill_search AS (
                                SELECT array_agg(s.skill_name) AS skill_list, p.*, 2 AS order_priority
                                    FROM projects p
                                    LEFT JOIN projects_skills ps ON p.project_id = ps.project_id
                                    LEFT JOIN skills s ON s.skill_id = ps.skill_id
                                WHERE s.skill_name IN (${sql_params})
                                GROUP BY p.project_id
                                )
                            SELECT *
                            FROM name_search
                            UNION
                            SELECT *
                            FROM skill_search
                            ORDER BY order_priority;`, [project_name, ...skill_params], function (errorMakingDatabaseQuery, result) {
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

router.get('/skills/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error CDB', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM projects_skills
                            JOIN skills ON projects_skills.skill_id = skills.skill_id
                            WHERE project_id = $1;`, [req.params.id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error MDB', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    });
});

router.get('/skillList', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * 
                            FROM skills`, function (errorMakingDatabaseQuery, result) {
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


//Assign project URL's to projects profilePicture
router.put('/projectPicture', function (req, res) {
    console.log('REQ.BODY', req.body);
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE projects SET project_picture=$1  WHERE project_id=$2;`, [req.body.project_picture, req.body.project_id],
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

//Project Profile Get
router.get('/profile/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM projects
            WHERE project_id = $1;`, [req.params.id], function (errorMakingDatabaseQuery, result) {
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

//Message project creator
router.put('/message', function (req, res) {
    console.log('REQ.BODY', req.body);
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM users_projects
            JOIN users ON users_projects.user_id = users.id
            WHERE project_id = $1 AND can_edit = true;`, [req.body.project_id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        res.sendStatus(500);
                    } else {
                        console.log('results: ', result.rows);

                        //send message via nodemailer
                        var mailOptions = {
                            from: `Hustle <startyourhustle@gmail.com>`,
                            to: `${result.rows[0].email}`,
                            subject: `HUSTLE: Collaborator message for ${req.body.project_name}`,
                            text: `${req.body.message}`,

                            auth: {
                                user: 'startyourhustle@gmail.com',
                                refreshToken: process.env.NODEMAILER_REFRESHTOKEN,
                                accessToken: process.env.NODEMAILER_ACCESSTOKEN
                            }
                        };

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log('This is your error: ', error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        res.sendStatus(201);
                    }
                })
        }
    })
});



module.exports = router;