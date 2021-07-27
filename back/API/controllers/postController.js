const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM post',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM post WHERE id = ?', [req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const create = (req,res,next) => {
    const post = req.body.post;
    mysqlDataBase.query( "INSERT INTO post (name) VALUES(?, ?)", [post.content, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const modify = (req,res,next) => {
    const  post = req.body.post;
    mysqlDataBase.query( "UPDATE post SET name = ? WHERE id = ? AND user_id = ?", [post.content, post.id, req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const remove = (req,res,next) => {
    const  post = req.body.post;
    mysqlDataBase.query( "DELETE FROM post WHERE id = ? AND user_id = ?", [post.id, req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}


export default { findAll, findOne, create, modify, remove }