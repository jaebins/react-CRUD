const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const mysql = require("mysql")

app.use(cors())

var sqlCon = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "1432",
    database : "jaebPosts"
})

app.post("/login", (req, res) => {
    sqlCon.query("SELECT *FROM user", (err, data) => {
        if(err){
            res.send(err)
        }
        else{
            isLoginSuc = false;
        
            for(i = 0; i < data.length; i++){
                if(req.query.userId == data[i].userId && 
                    req.query.userPw == data[i].userPw){
                    res.send({"loginResult" : "1"})
                    isLoginSuc = true;
                }
            }
        
            if(!isLoginSuc) res.send({"loginResult" : "0"})
        }
    })
})

app.post("/register", (req, res) => {
    var sql = "INSERT INTO user (userId, userPw) VALUES (?, ?)"
    sqlCon.query(sql, [req.query.userId, req.query.userPw], (err, data) => {
        if(err){
            res.send(err)
        }
        else{
            res.send({"registerResult" : "1"})
        }
    })
})

app.post("/getPosts", (req, res) => {
    sqlCon.query("SELECT *FROM posts ORDER BY ID DESC", (err, data) => {
        if(err)
            res.send(err)
        else
            res.send(data)
    })
})

app.post("/writePostEvent", (req, res) => {
    var sql = `INSERT INTO posts (title, description, date, userId) VALUES (?, ?, now(), ?)`
    sqlCon.query(sql, [req.query.title, req.query.description, req.query.userId], (err, data) => {
        if(err)
            res.send(err)
        else
            res.send({"postResult" : "1"})
    })
})

app.post("/getPost", (req, res) => {
    var sql = "SELECT *FROM posts WHERE ID=?"
    sqlCon.query(sql, [req.query.ID], (err, data) => {
        if(err)
            res.send(err)
        else
            res.send(data)
    })
})

app.post("/deletePost", (req, res) => {
    var sql = "DELETE FROM posts WHERE ID=?"
    sqlCon.query(sql, [req.query.ID], (err, data) => {
        if(err)
            res.send(err)
        else
            res.send({"deleteResult" : "1"})
    })
})

const port = 5000
app.listen(port, () => console.log(`Node.js Server is running on port ${port}`))
