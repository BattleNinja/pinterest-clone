const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const validator = require('express-validator');
const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log("Successfully connect to", config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error:', err);
});

const app = express();


app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(validator());

// Config Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});
// users
const users = require('./routes/users');
app.use('/users', users);
// process
const process = require('./routes/process');
app.use('/process', process);


const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log('listened on', port);
});
