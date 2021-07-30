USE groupomania_social_network;

SET NAMES 'utf8';

DROP PROCEDURE IF EXISTS login_fail;

DELIMITER |
CREATE PROCEDURE login_fail(IN _user_id INT, IN ip_adress VARCHAR(150), IN delay INT, IN attempt_limit INT)
BEGIN
    DECLARE attempt_number INTEGER;
    DECLARE is_blocked INTEGER;
    DECLARE remaining_time INTEGER;
    DECLARE since_time DATETIME DEFAULT (CURRENT_TIMESTAMP - INTERVAL delay MINUTE);

    INSERT INTO log_fail (user_id, ip, message) VALUES (_user_id, ip_adress, 'password fail');

    SELECT (delay*60) - TIMESTAMPDIFF(SECOND, created_at, CURRENT_TIMESTAMP ), COUNT(*) INTO remaining_time, is_blocked
    FROM blocked_user
    WHERE created_at >= (CURRENT_TIMESTAMP - INTERVAL delay MINUTE) AND user_id = _user_id;



    IF is_blocked THEN
        SELECT CONCAT("Account locked, remaining time : ", RIGHT(SEC_TO_TIME(remaining_time),5)) AS message;
    ELSE

        SELECT (created_at + INTERVAL delay MINUTE)  INTO since_time FROM blocked_user WHERE user_id = _user_id 
        AND (created_at + INTERVAL delay MINUTE) > (CURRENT_TIMESTAMP - INTERVAL delay MINUTE)
        ORDER BY created_at DESC LIMIT 1;

        SELECT COUNT(*) INTO attempt_number
        FROM log_fail WHERE created_at >= since_time AND user_id = _user_id;

        IF attempt_number >= attempt_limit THEN
            INSERT INTO blocked_user (user_id) VALUES(_user_id);
            SELECT CONCAT("Your accound has been locked for ", delay, " minutes") AS message;
        ELSE
            SELECT CONCAT("Remaining attempt before locking your account : ", (attempt_limit - attempt_number)) AS message;
        END IF;

    END IF;
END|
DELIMITER ;

CALL login_fail(1,'une adresse ip',1,5);










