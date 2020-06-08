const express = require("express");

const knex = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

//lets add some crud operations

server.get("/", (req, res) => {
    res.status(200).json({Api:"isup"})
})
//get
server.get("/api/accounts", (req, res) => {
    knex.select('*').from("accounts")
    .then(Accounts => {
    res.status(200).json(Accounts)
    })
    .catch(error => {
        console.log("get all error", error);
        res.status(500).json({Message: error})
    })
})
//getByID
server.get("/api/accounts/:id", (req, res) => {
    const id = req.params.id;
    knex.select('*').from("accounts").where({id: id})
    .then(Account => {
        res.status(200).json(Account)
    })
    .catch(error => {
        console.log("getById error", error)
        res.status(500).json({Message: error})
    })
})

//post
server.post('/api/accounts', (req, res) => {
    const body = req.body;
    knex('accounts').insert(body, "id")
    .then(([id]) => {
        res.status(200).json({id: id})
    })
    .catch(error => {
        console.log(".post error", error);
        res.status(500).json({message: error})
    })
})

//update
server.put('/api/accounts/:id', (req, res) => {
    const changes=req.body;
    const id=req.params.id;
    knex('accounts').where({id:id}).update(changes)
    .then(updatedData => {
        if(!updatedData){
            res.status(200).json({count: updatedData})
            } else{
                res.status(404).json({message: 'no record updated/found'})
            }
    })
    .catch(error => {
        console.log(".put error", error);
        res.status(500).json({message: "theres an error"})
    })
})

//delete
server.delete("/api/accounts/:id", (req, res) => {
    const id=req.params.id;
    knex('accounts').where({id:id}).del()
    .then(deletedUser => {
        if (!deletedUser) {
            res.status(400).json({Message: "Please Provide An Id"})
        } else {
            res.status(204).json({"accountsDeleted": deletedUser})
        }
    })
    .catch(error => {
        console.log(".put error", error);
        res.status(500).json({message: error})
    })
})


module.exports = server;
