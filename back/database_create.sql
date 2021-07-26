USE groupomania_social_network;

CREATE TABLE role(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE user(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pseudo VARCHAR(100) NOT NULL,
    avatar VARCHAR(255) DEFAULT "Une url d'un avatar par default",
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT CURRENT_TIMESTAMP,
    role_id INTEGER NOT NULL,
    CONSTRAINT FK_user_role_id FOREIGN KEY (role_id) REFERENCES role(id)
);


CREATE TABLE post(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT FK_post_user_id FOREIGN KEY (user_id) REFERENCES user(id)

);

CREATE TABLE comment(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    CONSTRAINT FK_comment_user_id FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT FK_comment_post_id FOREIGN KEY (post_id) REFERENCES post(id)
    
);

CREATE TABLE channel_group(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE channel(

    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(150),
    channel_group_id INTEGER NOT NULL,
    CONSTRAINT FK_channel_channel_group_id FOREIGN KEY (channel_group_id) REFERENCES channel_group(id)

);



