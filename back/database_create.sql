USE groupomania_social_network;

CREATE TABLE role(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE user(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    avatar VARCHAR(255) DEFAULT "Une url d'un avatar par default",
    email VARCHAR(255) NOT NULL UNIQUE,
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
    CONSTRAINT FK_channel_channel_group_id FOREIGN KEY (channel_group_id) REFERENCES channel_group(id)

);

CREATE TABLE post(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    channel_id INTEGER NOT NULL,
    CONSTRAINT FK_post_user_id FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT FK_post_channel_id FOREIGN KEY (channel_id) REFERENCES channel(id)

);

CREATE TABLE comment(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    CONSTRAINT FK_comment_user_id FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT FK_comment_post_id FOREIGN KEY (post_id) REFERENCES post(id)
    
);

CREATE TABLE log_fail(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip VARCHAR(50) NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT FK_log_user_id FOREIGN KEY (user_id) REFERENCES user(id)
    
);

CREATE TABLE blocked_user(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_blocked_user_id FOREIGN KEY (user_id) REFERENCES user(id)

);

/*initialisation*/

INSERT INTO role (name) VALUES("user");

INSERT INTO user (username,email,password,role_id) VALUES("fabou","f6e396c3e4948dc6a9fe8aaa8f2e4e19f177","$2b$10$L7U0WoEsC97bfyyJTxaqpOZZI3ow7N9CZt4Oiz9dn3B4Yi8OIPZuy", LAST_INSERT_ID());

INSERT INTO channel_group (name) VALUES("channel_group_init");

INSERT INTO channel (name, channel_group_id) VALUES("channel_init", LAST_INSERT_ID());

INSERT INTO post (content, channel_id, user_id) VALUES("contenu du post init", (SELECT MAX(id) FROM channel), (SELECT MAX(id) FROM user));

INSERT INTO comment (content, post_id, user_id) VALUES("contenu du commentaire init", (SELECT MAX(id) FROM post), (SELECT MAX(id) FROM user));

SELECT * FROM role;
SELECT * FROM user;
SELECT * FROM channel_group;
SELECT * FROM channel;
SELECT * FROM post;
SELECT * FROM comment;
