const isAdmin = (req, res, next) => {
    console.log(req.roleId == 1)
    req.isAdmin = req.roleId == 1;
    next();
}

module.exports = isAdmin;