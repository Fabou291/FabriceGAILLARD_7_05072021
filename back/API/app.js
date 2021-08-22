const express = require("express");
const createError = require("http-errors");
const path = require('path');
const app = express();

// Les apelles au fichiers de config
const headerConfig = require("../config/headerConfig.js");
const sessionConfig = require("../config/sessionConfig.js");
const limiterConfig = require("../config/limiterConfig.js");



headerConfig.initialization(app);
limiterConfig.initialization(app);
headerConfig.initialization(app);

// Les router
const roleRouter = require("./routes/roleRouter.js");
const userRouter = require("./routes/userRouter.js");
const authenticationRouter = require("./routes/authenticationRouter.js");
const channelGroupRouter = require("./routes/channelGroupRouter.js");
const channelRouter = require("./routes/channelRouter.js");
const postRouter = require("./routes/postRouter.js");
const commentRouter = require("./routes/commentRouter.js");


app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../images/")));
app.use('/api/role', roleRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authenticationRouter);
app.use('/api/channel-group', channelGroupRouter);
app.use('/api/post', postRouter);
app.use('/api/channel', channelRouter);
app.use('/api/comment', commentRouter);





app.use((error, req, res, next) => {
    console.log(error)
    //if(Object.keys(error).length === 0) error = createError.InternalServerError('Erreur serveur')
    res.status(error.statusCode || 500).json(error)
    res.end();
});


module.exports = app;
