require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    app = express(),
    port = 4050,
    {SESSION_SECRET, CONNECTION_STRING} = process.env;

const authCtrl = require('./controllers/authController.js');

massive(CONNECTION_STRING).then(db =>{
    app.set('db', db);
    console.log('DB CONNECTED')
})


app.use(express.json());
app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)

app.post('/auth/register', authCtrl.register);


app.listen(port, ()=> console.log(`SERVER IS RUNNING ON ${port}`));