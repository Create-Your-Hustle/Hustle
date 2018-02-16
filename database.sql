CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    user_bio VARCHAR(2000),
    user_rating DECIMAL,
    user_picture VARCHAR(150),
    user_place_id VARCHAR,
    user_city VARCHAR(50),
    user_state VARCHAR(20),
    user_remote BOOLEAN DEFAULT true,
    user_for_pay BOOLEAN DEFAULT true,
    user_for_trade BOOLEAN DEFAULT true,
    user_duration_min INT,
    user_duration_max INT,
    user_weekly_min INT,
    user_weekly_max INT,
    code VARCHAR(20),
    display_name VARCHAR(150)
);



CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(50) NOT NULL UNIQUE
);



CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(50) NOT NULL,
    project_description VARCHAR(1000),
    project_picture VARCHAR(150),
    project_place_id VARCHAR(50),
    project_city VARCHAR(20),
    project_state VARCHAR(20),
    project_remote BOOLEAN,
    project_for_pay BOOLEAN,
    project_for_trade BOOLEAN,
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
    user_project_role VARCHAR(100) NOT NULL,
    collaboration_request BOOLEAN,
    collaborator BOOLEAN
);



CREATE TABLE ratings (
    rating_id SERIAL NOT NULL,
    reviewed_user_id INT REFERENCES users,
    reviewer_id INT REFERENCES users,
    communication INT,
    followthrough INT,
    friendliness INT,
    accuracy INT,
    overall INT
);

-- The below INSERT adds skills to the database- these can be adjusted depending on administrator needs.

INSERT INTO skills(
    skill_name) VALUES ('Accounting'), ('Acting'), ('Advertising'), ('Animation'), ('Architecture'), ('Back End Developer'), ('Business Strategy'), ('Ceramics '), ('Cinematography'), ('Clothing design'), ('Communications'), ('Content Strategy'), ('Cooking'), ('Copywriting'), ('Crafts'), ('Culinary Arts'), ('Dance'), ('Dev Ops'), ('Digital Marketing'), ('Directing'), ('Drawing'), ('Entrepreneurship'), ('Fashion'), ('Film'), ('Finance'), ('Fine Art'), ('Front End Developer'), ('Full Stack Developer'), ('Furniture Design'), ('Game Design'), ('Graffiti'), ('Graphic Design'), ('Hardware'), ('Illustration'), ('Interior Design'), ('Jewlery Design'), ('Landscaping'), ('Makeup Arts'), ('Marketing'), ('Music'), ('Painting'), ('Performing Arts'), ('Photography'), ('Print Design '), ('Product Management'), ('Programming'), ('Project Management'), ('Sculpture'), ('Set Design'), ('Social Media'), ('Sound Design'), ('Textiles'), ('UX/UI'), ('Visual Effects'), ('Web Design'), ('Web Development'), ('Writing');

--The below creates a SQL function that updates the average rating for a user

CREATE OR REPLACE FUNCTION avg_rating()
  RETURNS trigger AS
$$
BEGIN
    WITH new_avg AS (
        SELECT AVG(r.overall) as avg, r.reviewed_user_id
        FROM ratings r 
        GROUP BY r.reviewed_user_id)
     UPDATE users
     SET user_rating = avg
     FROM new_avg na
     WHERE id = na.reviewed_user_id;
    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER update_avg
    AFTER INSERT ON ratings
    FOR EACH ROW
    EXECUTE PROCEDURE avg_rating();
