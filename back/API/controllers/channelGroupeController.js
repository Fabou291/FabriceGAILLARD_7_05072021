const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM channel_group',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM channel_group WHERE id = ?', [req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const create = (req,res,next) => {
    const channelGroup = req.body.channelGroup;
    mysqlDataBase.query( "INSERT INTO channel_group (name) VALUES(?) ", [channelGroup.name], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const modify = (req,res,next) => {
    const channelGroup = req.body.channelGroup;
    mysqlDataBase.query( "UPDATE channel_group SET name = ? WHERE id = ?", [channelGroup.name, req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const remove = (req,res,next) => {
    const channelGroup = req.body.channelGroup;
    mysqlDataBase.query( "DELETE FROM channel_group WHERE id = ? AND user_id = ?", [channelGroup.id, req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}


export default { findAll, findOne, create, modify, remove }