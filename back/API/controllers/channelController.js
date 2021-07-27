const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM channel',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM channel WHERE id = ?', [req.userId], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const create = (req,res,next) => {
    const channel = req.body.channel;
    mysqlDataBase.query( "INSERT INTO channel (name) VALUES(?, ? ,?) ", [channel.name, channel.description, channel.channel_group_id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const modify = (req,res,next) => {
    const channel = req.body.channel;
    mysqlDataBase.query( "UPDATE channel SET name = ?, ? ,? WHERE id = ? AND user_id = ?", [channel.name, channel.description, channel.channel_group_id, channel.id, req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const remove = (req,res,next) => {
    const channel = req.body.channel;
    mysqlDataBase.query( "DELETE FROM channel WHERE id = ? AND user_id = ?", [channel.id, req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}


export default { findAll, findOne, create, modify, remove }