DROP DATABASE groupomania_social_network;
CREATE DATABASE groupomania_social_network;
USE groupomania_social_network;

SET NAMES 'utf8';

CREATE TABLE role(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE user(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    avatar VARCHAR(255) DEFAULT "url",
    email VARCHAR(255) NOT NULL UNIQUE,
    description TEXT DEFAULT NULL,
    password VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    refresh_token VARCHAR(150) DEFAULT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT FK_user_role_id FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE channel_group(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE channel(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(150),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    channel_group_id INTEGER NOT NULL,
    CONSTRAINT FK_channel_channel_group_id FOREIGN KEY (channel_group_id) REFERENCES channel_group(id) ON DELETE CASCADE

);

CREATE TABLE post(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    content TEXT DEFAULT NULL,
    image_url TEXT DEFAULT NULL,
    user_id INTEGER NOT NULL,
    channel_id INTEGER DEFAULT NULL,
    post_id INTEGER DEFAULT NULL,
    CONSTRAINT FK_post_user_id FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT FK_post_channel_id FOREIGN KEY (channel_id) REFERENCES channel(id) ON DELETE CASCADE,
    CONSTRAINT FK_post_id FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE ,
    CONSTRAINT FK_not_NULL CHECK ((NOT post_id IS NULL) OR (NOT channel_id IS NULL)),
    CONSTRAINT FK_not_NULL_POST_IMG CHECK ((NOT content IS NULL) OR (NOT image_url IS NULL))

);

CREATE TABLE log_fail(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(50) NOT NULL,
    message VARCHAR(150) NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT FK_log_user_id FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
    
);

CREATE TABLE blocked_user(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_blocked_user_id FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE

);

CREATE TABLE reaction(
    emoji_id SMALLINT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    CONSTRAINT FK_reaction_post_user_id FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE, 
    CONSTRAINT FK_reaction_post_comment_id FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
    UNIQUE KEY reaction_post_unique (emoji_id,user_id,post_id)
);


/* TABLE "TEMPORAIRE" */
DROP TABLE IF EXISTS avatar_set;
CREATE TABLE avatar_set (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


/*INSERTIONS*/
SET @pathAvatar = "avatarDefaultSet/";
INSERT INTO avatar_set (name) VALUES ("A"), ("B"), ("C"), ("D"), ("E"), ("F"), ("G"), ("H");


INSERT INTO role (name) 
    VALUES
    ("admin"),
    ("user");

INSERT INTO user (username,email,password,role_id,avatar) 
    VALUES
    ("Fab","f6e396c3e4948dc6a9fe8aaa8f2e4e19f177","$2b$10$L7U0WoEsC97bfyyJTxaqpOZZI3ow7N9CZt4Oiz9dn3B4Yi8OIPZuy", 1, (SELECT CONCAT(@pathAvatar, (SELECT name FROM avatar_set ORDER BY RAND() LIMIT 1), '.svg'))),
    ("Vicent","a","t", 2, (SELECT CONCAT(@pathAvatar, (WITH cte AS (SELECT name FROM avatar_set ORDER BY RAND() LIMIT 1) SELECT name FROM cte), '.svg'))),
    ("Gaetan","b","$2b$10$d", 2, (SELECT CONCAT(@pathAvatar, (WITH cte AS (SELECT name FROM avatar_set ORDER BY RAND() LIMIT 1) SELECT name FROM cte), '.svg'))),
    ("Tintin","c","$2b$10$d", 2, (SELECT CONCAT(@pathAvatar, (WITH cte AS (SELECT name FROM avatar_set ORDER BY RAND() LIMIT 1) SELECT name FROM cte), '.svg'))),
    ("Liline","d","$2b$10$d", 2, (SELECT CONCAT(@pathAvatar, (WITH cte AS (SELECT name FROM avatar_set ORDER BY RAND() LIMIT 1) SELECT name FROM cte), '.svg'))),
    ("Madeline","e","$2b$10$z", 2, (SELECT CONCAT(@pathAvatar, (WITH cte AS (SELECT name FROM avatar_set ORDER BY RAND() LIMIT 1) SELECT name FROM cte), '.svg'))),
    ("Jeremy","f","$2b$10$z", 2, (SELECT CONCAT(@pathAvatar, (WITH cte AS (SELECT name FROM avatar_set ORDER BY RAND() LIMIT 1) SELECT name FROM cte), '.svg')));

INSERT INTO channel_group (name) 
    VALUES
    ("group 1"),
    ("group 2"),
    ("group 3"),
    ("group 4");

INSERT INTO channel (name, channel_group_id) 
    VALUES
    ("channel 1_1", 1),
    ("channel 1_2", 1),
    ("channel 1_3", 1),

    ("channel 2_1", 2),
    ("channel 2_2", 2),
    ("channel 2_3", 2),

    ("channel 3_1", 3),
    ("channel 3_2", 3),
    ("channel 3_3", 3),

    ("channel 4_1", 4),
    ("channel 4_2", 4),
    ("channel 4_3", 4);

INSERT INTO post (content, channel_id, user_id) 
    VALUES
    ("post", 1, 1),
    ("post", 1, 3),
    ("post", 1, 5),
    ("post", 1, 4),
    ("post", 1, 2),
    ("post", 1, 1),
    ("post", 1, 6),
    ("post", 1, 2),

    ("post", 1, 7),
    ("post", 1, 6),
    ("post", 1, 2),
    ("post", 1, 1),

    ("post", 1, 1),
    ("post", 1, 3),
    ("post", 1, 7),
    ("post", 1, 4),
    ("post", 1, 2),
    ("post", 1, 1),

    ("post", 2, 1);

INSERT INTO post (content, post_id, user_id) 
    VALUES
    ("com", 1, 1),
    ("com", 2, 2),
    ("com", 4, 4),
    ("com", 1, 5),
    ("com", 3, 6),
    ("com", 1, 7),
    ("com", 7, 2),
    ("com", 1, 1),
    ("com", 3, 1),

    ("com", 19, 1);


INSERT INTO reaction (emoji_id, user_id, post_id)
    VALUES
    (12, 1, 1), (5, 1, 1), (5, 2, 1),

    (10, 1, 2), (10, 2, 2),

    (9, 1, 3), (9, 2, 3),
    (9, 3, 3), (9, 4, 3), (9, 5, 3),

    (40, 1, 4), (40, 2, 4),
    (40, 3, 4),
    
    (20, 3, 20);

DROP TABLE avatar_set;

DROP PROCEDURE IF EXISTS login_fail;
DELIMITER |
CREATE PROCEDURE login_fail(IN _user_id INT, IN ip_adress VARCHAR(150), IN delay INT, IN attempt_limit INT)
BEGIN
    DECLARE attempt_number INTEGER;
    DECLARE since_delay DATETIME DEFAULT (CURRENT_TIMESTAMP - INTERVAL delay MINUTE);
    DECLARE since_last_time DATETIME DEFAULT since_delay;

    SELECT (created_at + INTERVAL delay MINUTE) INTO since_last_time FROM blocked_user WHERE user_id = _user_id 
    AND (created_at + INTERVAL delay MINUTE) > since_delay ORDER BY created_at DESC LIMIT 1;

    SELECT COUNT(*) INTO attempt_number FROM log_fail WHERE created_at >= since_last_time AND user_id = _user_id;

    IF attempt_number >= attempt_limit THEN
        INSERT INTO blocked_user (user_id) VALUES(_user_id);
        SELECT CONCAT("Your accound has been locked for ", delay, " minutes") AS message;
    ELSE
        SELECT CONCAT("Password incorrect, Remaining attempt before locking your account : ", (attempt_limit - attempt_number)) AS message;
    END IF;
END|
DELIMITER ;

SELECT * FROM role;
SELECT * FROM user;
SELECT * FROM channel_group;
SELECT * FROM channel;
SELECT * FROM post;
SELECT * FROM reaction;
