CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50),
	password VARCHAR(100),
	display_name VARCHAR(50) UNIQUE,
	user_bio VARCHAR(1000),
	user_rating DECIMAL,
	user_picture VARCHAR(150),
	-- Changed character count to 150, LinkedIn picture I tried to upload here failed because address was too long
	user_place_id VARCHAR,
	user_city VARCHAR(20),
	user_state VARCHAR(20),
	user_remote BOOLEAN,
	user_for_pay BOOLEAN,
	user_for_trade BOOLEAN,
	user_duration_min INT,
	user_duration_max INT,
	user_weekly_min INT,
	user_weekly_max INT
);



CREATE TABLE skills (
	skill_id SERIAL PRIMARY KEY,
	skill_name VARCHAR(50) NOT NULL UNIQUE
);



CREATE TABLE projects (
	project_id SERIAL PRIMARY KEY,
	project_name VARCHAR(50) NOT NULL,
	project_description VARCHAR(1000),
	project_picture VARCHAR(100),
	project_place_id VARCHAR(50),
	project_city VARCHAR(20),
	project_state VARCHAR(20),
	project_remote BOOLEAN NOT NULL,
	project_for_pay BOOLEAN NOT NULL,
	project_for_trade BOOLEAN NOT NULL,
	project_duration_min INT,
	project_duration_max INT,
	project_weekly_min INT,
	project_weekly_max INT
);



CREATE TABLE users_skills (
	user_skill_id SERIAL PRIMARY KEY,
	skill_rating DECIMAL NOT NULL,
	user_id INT REFERENCES users,
	skill_id INT REFERENCES skills
);



CREATE TABLE projects_skills (
	project_skill_id SERIAL PRIMARY KEY,
	required_rating INT NOT NULL,
	project_id INT REFERENCES projects,
	skill_id INT REFERENCES skills
);



CREATE TABLE users_projects (
	user_project_id SERIAL PRIMARY KEY,
	can_edit BOOLEAN NOT NULL,
	user_id INT REFERENCES users,
	project_id INT REFERENCES projects,
	user_project_role VARCHAR(100) NOT NULL
);



CREATE TABLE ratings (
	rating_id SERIAL NOT NULL,
	reviewed_user_id INT REFERENCES users,
	reviewer_id INT REFERENCES users,
	rating INT NOT NULL
);

