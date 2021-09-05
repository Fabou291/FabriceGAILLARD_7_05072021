const {mysqlDataBase, mysqlAsyncQuery} = require("../../config/mysqlConfig.js");
const imageHelper = require("../helpers/ImageHelper.js");

const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM post',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}


const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM post WHERE id = ?', [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

const create = (req,res,next) => {
    const imageUrl = req.file ? req.file.filename : null ;
    mysqlDataBase.query( "INSERT INTO post (content, channel_id, post_id, image_url, user_id) VALUES(?,?,?,?,?)", [req.body.content, parseInt(req.body.channelId), JSON.parse(req.body.postId), imageUrl, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({ id : results.insertId, imageUrl })
    })
}

const modify = (req,res,next) => {
    mysqlDataBase.query( "UPDATE post SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?", [req.body.content, req.params.id, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send(results)
    })
}

const remove = async (req,res,next) => {
    try{
        let reqAdds = "";
        const user = (await mysqlAsyncQuery("SELECT * FROM user WHERE id = ?", [req.userId]))[0];
        if(user.role_id != 1) reqAdds = "AND user_id = ?";

        const post = (await mysqlAsyncQuery("SELECT * FROM post WHERE id = ?" + reqAdds, [req.params.id, req.userId]))[0];
        if(post.image_url != null) await imageHelper.remove(post.image_url);

        const results = await mysqlAsyncQuery("DELETE FROM post WHERE id = ?" + reqAdds, [req.params.id, req.userId]);
        res.status(200).send(results);
       
    } catch(error){ next(error) }
}


module.exports = { findAll, findOne, create, modify, remove }

/**
 * 
    SELECT * FROM post WHERE id = 3 AND user_id = 1
    UNION
    SELECT * FROM user WHERE id = 1;


*/