USE groupomania_social_network;



SELECT *, @user_id := id FROM user WHERE email= "f6e396c3e4948dc6a9fe8aaa8f2e4e19f177";
SET @delay = 5;
SELECT (@delay*60) - TIMESTAMPDIFF(SECOND, created_at, CURRENT_TIMESTAMP ) as remaining_time, COUNT(*) as is_blocked
FROM blocked_user WHERE created_at >= (CURRENT_TIMESTAMP - INTERVAL @delay MINUTE) AND user_id = @user_id;



