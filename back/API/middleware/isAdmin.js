const isAdmin = (req, res, next) => {
    req.isAdmin = req.roleId == 1;
    next();
}

module.exports = isAdmin;