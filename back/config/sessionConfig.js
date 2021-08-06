const session = require("express-session");

const ONE_HOUR = 1000 * 60 * 60;
const NODE_ENV = "devlopment";
const SESSION_SECRET = "AN_OTHER_SECRET_SESSION";

const initialization = (app) => {
    app.use(
        session({
            resave: false, //n'authorise pas à save dans session store
            name: "sid",
            saveUninitialized: false,
            secret: SESSION_SECRET,
            cookie: {
                domain : "http://localhost:8080/",
                maxAge: ONE_HOUR,
                httpOnly: true, //HTTP only
                sameSite: true,
                secure: NODE_ENV === "production", //passer à true lorsque la connexion sera en https
            },
        })
    );
}

module.exports = { initialization }
