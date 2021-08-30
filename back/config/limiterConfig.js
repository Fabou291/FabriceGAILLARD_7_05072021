const rateLimit = require("express-rate-limit");
//Protège des attaques ddos

const initialization = (app) => {
    app.use(rateLimit({
        windowMs: 10 * 1000,
        max: 200
    }));
}



module.exports = {initialization}
  