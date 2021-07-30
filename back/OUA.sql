USE groupomania_social_network;

SET NAMES 'utf8';

DROP PROCEDURE IF EXISTS login_fail;

DELIMITER |
CREATE PROCEDURE login_fail(IN _user_id INT, IN ip_adress VARCHAR(150), IN delay INT, IN attempt_limit INT)
BEGIN
    DECLARE attempt_number INTEGER;
    DECLARE since_delay DATETIME DEFAULT (CURRENT_TIMESTAMP - INTERVAL delay MINUTE);
    DECLARE since_last_time DATETIME DEFAULT since_delay;

    INSERT INTO log_fail (user_id, ip, message) VALUES (_user_id, ip_adress, 'password fail');

    SELECT (created_at + INTERVAL delay MINUTE) INTO since_last_time FROM blocked_user WHERE user_id = _user_id 
    AND (created_at + INTERVAL delay MINUTE) > since_delay ORDER BY created_at DESC LIMIT 1;

    SELECT COUNT(*) INTO attempt_number FROM log_fail WHERE created_at >= since_last_time AND user_id = _user_id;

    IF attempt_number >= attempt_limit THEN
        INSERT INTO blocked_user (user_id) VALUES(_user_id);
        SELECT CONCAT("Your accound has been locked for ", delay, " minutes") AS message;
    ELSE
        SELECT CONCAT("Remaining attempt before locking your account : ", (attempt_limit - attempt_number)) AS message;
    END IF;
END|
DELIMITER ;

CALL login_fail(1,'une adresse ip',1,5);










