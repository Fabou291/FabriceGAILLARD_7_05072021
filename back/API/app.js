const express = require("express");
const path = require('path');
const app = express();

// Apelles aux fichiers de config
const headerConfig = require("../config/headerConfig.js");
const sessionConfig = require("../config/sessionConfig.js");
const limiterConfig = require("../config/limiterConfig.js");

// Apelles aux fichiers de routing
const roleRouter = require("./routes/roleRouter.js");
const userRouter = require("./routes/userRouter.js");
const authenticationRouter = require("./routes/authenticationRouter.js");
const channelGroupRouter = require("./routes/channelGroupRouter.js");
const channelRouter = require("./routes/channelRouter.js");
const postRouter = require("./routes/postRouter.js");
const reactionRouter = require("./routes/reactionRouter.js");

// Configuration du server
headerConfig.initialization(app);
limiterConfig.initialization(app);
sessionConfig.initialization(app);

// Routing
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../images/")));
app.use('/api/role', roleRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authenticationRouter);
app.use('/api/channel-group', channelGroupRouter);
app.use('/api/post', postRouter);
app.use('/api/channel', channelRouter);
app.use('/api/reaction', reactionRouter);

app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.statusCode || 500).json(error)
    res.end();
});


module.exports = app;
