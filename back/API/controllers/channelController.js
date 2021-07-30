import {mysqlDataBase} from "../../config/mysqlConfig.js";
const findAll = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM channel',function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const findOne = (req,res,next) => {
    mysqlDataBase.query('SELECT * FROM channel WHERE id = ?', [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const create = (req,res,next) => {
    const channel = req.body.channel;
    mysqlDataBase.query( "INSERT INTO channel (name,description,channel_group_id) VALUES(?, ? ,?) ", [channel.name, channel.description, channel.channel_group_id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const modify = (req,res,next) => {
    const channel = req.body.channel;
    mysqlDataBase.query( "UPDATE channel SET name = ?, description = ?, channel_group_id = ? WHERE id = ?", [channel.name, channel.description, channel.channel_group_id, req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}

const remove = (req,res,next) => {
    const channel = req.body.channel;
    mysqlDataBase.query( "DELETE FROM channel WHERE id = ?", [req.params.id], function(error, results, fields){
        if(error) next(error)
        else res.status(200).send({listRole : results})
    })
}


export default { findAll, findOne, create, modify, remove }