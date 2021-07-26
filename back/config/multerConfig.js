

const initialization = (app) => {
    app.use((req,res,next) => {
        next();
    })
}

export default { initialization };
