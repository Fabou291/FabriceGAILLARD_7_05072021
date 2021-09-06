const rateLimit = require("express-rate-limit");

/**
 * @name initialization
 * @description Initialisation d'un limiteur de trafic
 * Pour se protéger des attaques ddos
 * @param {*} app 
 */
const initialization = (app) => {
    app.use(rateLimit({
        windowMs: 10 * 1000,
        max: 200
    }));
}



module.exports = {initialization}
  