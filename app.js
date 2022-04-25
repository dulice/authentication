const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const User = require('./routes/auth');
const Posts = require('./routes/post')

const app = express();

dotenv.config();

//middleware
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.use('/user', User);
app.use('/posts', Posts)

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(3000);
        console.log('connect to db');
    })
    .catch(err => console.log(err.message)); 

// app.listen(3000, () => console.log('run')) 
