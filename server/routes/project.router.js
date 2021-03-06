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
            res.sendStatus(500);
        } else {
            client.query(`SELECT array_agg(s.skill_name) AS skill_list, p.* FROM projects p LEFT JOIN projects_skills ps ON p.project_id = ps.project_id LEFT JOIN skills s ON s.skill_id = ps.skill_id GROUP BY p.project_id;`, function (errorMakingDatabaseQuery, result) {
                done();
                if (errorMakingDatabaseQuery) {
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
            res.sendStatus(500);
        } else {
            client.query(`WITH new_project AS (INSERT INTO projects ("project_name", "project_picture")
            VALUES ('New Project', '../assets/projectDefault.png') RETURNING project_id)
            INSERT INTO users_projects ("user_id", "project_id", "can_edit", "user_project_role")
            VALUES ($1, (Select project_id FROM new_project), true , 'Creator') RETURNING 	project_id;`, [req.user.id],
                function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500)
                    } else {
                        res.send(result.rows)
                    }
                });
        }
    })
})

//Main project put
router.put('/', function (req, res) {

    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
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
                });
        }
    });
});



//Project Search Get
router.get('/search', function (req, res) {
    let project_name = req.query.project_name;
    if (project_name !== '') {
        project_name = `%` + req.query.project_name + `%`
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
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
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
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM projects_skills
                            JOIN skills ON projects_skills.skill_id = skills.skill_id
                            WHERE project_id = $1;`, [req.params.id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
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
            res.sendStatus(500);
        } else {
            client.query(`SELECT * 
                            FROM skills
                            ORDER BY skill_name`, function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
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
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
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
            res.sendStatus(500);
        } else {
            client.query(`SELECT projects.*,  users_projects.user_id FROM projects
                        JOIN users_projects ON projects.project_id = users_projects.project_id
                        WHERE projects.project_id = $1 AND can_edit = true;`, [req.params.id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    });
});

//Get project Collaborators 
router.get('/project-collaborators/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
            client.query(`SELECT users_projects.user_project_role, users.display_name, users.id, users.user_picture FROM users_projects
                        JOIN users ON users_projects.user_id = users.id
                        WHERE project_id = $1 AND collaboration_request = false;`, [req.params.id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    });
});

//Get collaboration requests 
router.get('/collaboration-requests/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
            client.query(`SELECT users_projects.user_project_role, users.display_name, users.id, users.user_picture FROM users_projects
                        JOIN users ON users_projects.user_id = users.id
                        WHERE project_id = $1 AND collaboration_request = true;`, [req.params.id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
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
    if (req.isAuthenticated()) {
        console.log(req.body);
        console.log(req.user);
    
    
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                res.sendStatus(500);
            } else {
                client.query(`WITH insert_invite AS (
                            INSERT INTO users_projects (can_edit, user_id, project_id, user_project_role, collaboration_request)
                            VALUES (false, $1, $2, $3, true)) 
                            SELECT * FROM users_projects
                            JOIN users ON users_projects.user_id = users.id
                            WHERE project_id = $2 AND can_edit = true;`, [req.user.id, req.body.project_id, req.body.project_role], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        res.sendStatus(500);
                    } else {
                        //send message via nodemailer
                        var mailOptions = {
                            from: `Hustle <startyourhustle@gmail.com>`,
                            to: `${result.rows[0].username}`,
                            subject: `HUSTLE: Collaborator message about ${req.body.project_name}`,
                            html: `
                            <div bgcolor="#ff634f">
                            <h2>You've received a message about ${req.body.project_name}</h2>
                            <h3>From:</h3>
                            <p>${req.user.display_name}</p>
                            <h3>Message:</h3>
                            <p>${req.body.message}</p>
                            <h3>Link to Project:</h3>
                            <ul><a href="http://localhost:5000/#/projectprofile/${req.body.project_id}">Click Here</a></ul>
                                <p>Thank you</p>
                                </div>`,

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
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
});


//Puts collaborator ratings into DB
router.put('/collaboratorRatings', function (req, res) {
    let ratings = req.body.rating;
    let communication = ratings[0].current;
    let followthrough = ratings[1].current;
    let friendliness = ratings[2].current;
    let accuracy = ratings[3].current;
    let overall = ratings[4].current;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
                client.query(`INSERT INTO ratings (reviewed_user_id, reviewer_id, communication, followthrough, friendliness, accuracy, overall)
                VALUES ($1, $2, $3, $4, $5, $6, $7);`,
                    [req.body.collaborator, req.user.id, communication, followthrough, friendliness, accuracy, overall],
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            res.sendStatus(500)
                        }
                    });
            
        }
    })
});


router.get('/myProjects/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
            client.query(`SELECT *
                            FROM users_projects up
                            JOIN projects p ON p.project_id = up.project_id
                            WHERE up.user_id = $1;`, [req.params.id], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
        }
    })
});

//Add skill to a project
router.post('/addProjectSkill', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO projects_skills (required_rating, project_id, skill_id)
            VALUES ($1, $2, $3);`, [req.body.level, req.body.project, req.body.skill],
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

//Collaborator projects get
router.get('/collaborator-projects', function (req, res) {
    if(req.isAuthenticated()) {
        pool.connect(function (errorConnectingToDatabase, client, done) {
            const email = req.query.username;
            if (errorConnectingToDatabase) {
                res.sendStatus(500);
            } else {
                client.query(`SELECT p.project_name, p.project_description, p.project_picture, p.project_id FROM projects p
                            JOIN users_projects up ON up.project_id = p.project_id
                            JOIN users u ON u.id = up.user_id
                            WHERE up.can_edit = true
                            AND u.username = $1;`, [email], function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        res.sendStatus(500);
                    } else {
                        res.send(result.rows);
                    }
                });
            }
        });
    } else {
        res.sendStatus(401);
    };
});

//accepts collaboration requests on projects
router.put('/acceptCollaboration', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
            client.query(`UPDATE users_projects SET collaboration_request= false, collaborator= true  WHERE user_id=$1 AND project_id=$2;`, [req.body.user, req.body.project],
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

//declines collaboration requests on projects
router.put('/declineCollaboration', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM users_projects WHERE user_id=$1 AND project_id=$2 AND collaboration_request=true;`, [req.body.user, req.body.project],
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

//changes project name and bio
router.put('/nameAndBio', function (req, res) {
    if (req.isAuthenticated()) {       
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                res.sendStatus(500);
            } else {
                client.query(`UPDATE projects SET project_name = $1, project_description = $2 WHERE project_id = $3;`, [req.body.project_name, req.body.project_description, req.body.project_id], function (errorMakingDatabaseQuery, result) {
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
}); // end name and bio put

//changes project preferences
router.put('/preferences', function (req, res) {   
    if (req.isAuthenticated()) {       
        pool.connect(function (errorConnectingToDatabase, client, done) {
            if (errorConnectingToDatabase) {
                res.sendStatus(500);
            } else {
                client.query(`UPDATE projects SET project_city = $1, project_state = $2, project_remote = $3, project_for_pay = $4, project_for_trade = $5
                 WHERE project_id = $6;`, [req.body.project_city, req.body.project_state, req.body.project_remote, req.body.project_for_pay, req.body.project_for_trade, req.body.project_id], 
                 function (errorMakingDatabaseQuery, result) {
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
}); // end preference put

module.exports = router;