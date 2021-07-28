import JWT from "jsonwebtoken";

const getAccessToken = (userId) => {
    return JWT.sign({ userId }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
};

const getRefreshToken = (userId) => {
    return JWT.sign({ userId }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "1m" });
};

export default { getAccessToken, getRefreshToken };
