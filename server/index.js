const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

// initialize MySQL database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ToDoListDatabase'
})

// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// API endpoints
app.get('/api/get', (req, res) => {
    const selectSQL = "SELECT * FROM todos"
    db.query(selectSQL, (err, result) => {
        res.send(result)
    })
})

app.post('/api/post', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const completed = req.body.completed

    const insertSQL = "INSERT INTO todos (id, title, completed) VALUES (?, ?)"
    db.query(insertSQL, [id, title, completed], (err, result) => {
        console.log(result)
    })
})

app.delete('/api/delete', (req, res) => {
    const id = req.params.id
    const deleteSQL = "DELETE FROM todos WHERE id = ?"

    db.query(deleteSQL, id, (error, result) => {
        if(error) console.log(error)
    })
})

app.put('/api/update', (req, res) => {
    const completed = req.body.completed
    const id = req.body.id
    const updateSQL = "UPDATE todos SET completed = ? WHERE id = ?"

    db.query(deleteSQL, [completed, id], (error, result) => {
        if(err) console.log(err)
    })
})

// listen on port 3001
app.listen(3001, () => {
    console.log('listening on port 3001')
})