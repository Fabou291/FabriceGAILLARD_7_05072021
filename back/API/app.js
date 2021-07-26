import express from "express";
import createError from "http-errors";
const app = express();

// Les apelles au fichiers de config
import multerConfig from "../config/multerConfig.js";
import headerConfig from "../config/headerConfig.js";


//multerConfig.initialization(app);
headerConfig.initialization(app);

// Les router
import authenticationRouter from "./routes/authenticationRouter.js";
import userRouter from "./routes/userRouter.js";
import roleRouter from "./routes/roleRouter.js";

app.use(express.json());
app.use('/auth', authenticationRouter);
app.use('/user', userRouter);
app.use('/role', roleRouter);

/*app.use('/post', (req,resp,next)=>{});
app.use('/comment', (req,resp,next)=>{});
app.use('/channel-group', (req,resp,next)=>{});
app.use('/channel', (req,resp,next)=>{});*/

app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.statusCode || 500).json({ error })
    res.end();
});


export default app;
