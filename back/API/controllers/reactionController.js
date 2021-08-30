const {mysqlDataBase} = require("../../config/mysqlConfig.js");

const create = (req,res,next) => {
    const imageUrl = req.file ? req.file.filename : null ;
    mysqlDataBase.query( "INSERT INTO reaction (user_id, emoji_id, post_id) VALUES(?,?,?)", [req.userId, req.body.emojiId, req.body.postId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

const remove = (req,res,next) => {
    const  reaction = req.body.reaction;
    req.userId = 1
    mysqlDataBase.query( "DELETE FROM reaction WHERE emoji_id = ? AND user_id = ? AND post_id = ?", [req.body.emojiId, req.userId, req.body.postId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}


module.exports = { create, remove }