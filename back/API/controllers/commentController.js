const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM comment',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM comment WHERE id = ?', [req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const create = (req,res,next) => {
    const comment = req.body.comment;
    mysqlDataBase.query( "INSERT INTO comment (name) VALUES(?, ?)", [comment.content, req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const modify = (req,res,next) => {
    const  comment = req.body.comment;
    mysqlDataBase.query( "UPDATE comment SET name = ? WHERE id = ? AND user_id = ?", [comment.content, post.id, req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const remove = (req,res,next) => {
    const  comment = req.body.comment;
    mysqlDataBase.query( "DELETE FROM comment WHERE id = ? AND user_id = ?", [comment.id, req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}


export default { findAll, findOne, create, modify, remove }