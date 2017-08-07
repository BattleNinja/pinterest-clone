const router = require('express').Router();
const User = require('../models/user');
const util = require('util');
const jwt = require('jsonwebtoken');
const passport = require('passport');
config = require('../config/database');

router.get('/', (req, res) => {
    res.send('works')
});

router.post('/register', (req, res) => {
    req.checkBody('name', 'Can not be empty').notEmpty();
    req.checkBody('username', 'Can not be empty').notEmpty();
    req.checkBody('email', 'Invalide email').isEmail();
    req.checkBody('password', 'Not long enough').len(2, 5);
    req.checkBody('password2', 'password not match').notEmpty();
    req.checkBody('password2', 'password not match').matches(req.body.password);

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            return res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        }
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            pinlist:[],
            likedList:[]
        });
        User.checkExist(newUser, (err, user) => {
            if (err) throw err;
            if (user) {
                res.json({success: false, msg: 'Email has exist'});
            } else {
                User.addUser(newUser, (err, data) => {
                    if (err) {
                        res.json({success: false, msg: 'Failed to register user'});
                    } else {
                        res.json({success: true, msg: 'User registered'});
                    }
                });
            }
        });
    });
});

router.post('/authenticate', (req, res) => {
    req.checkBody('email', 'Invalide email').isEmail();
    req.checkBody('password', 'Not long enough').len(2, 5);

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        }
        else {
            const email = req.body.email;
            const password = req.body.password;
            User.getUserByEmail(email, (err, user) => {
                if (err) throw err;
                if (!user) {
                    res.json({success: false, msg: 'Wrong email'});
                } else {
                    User.comparePassword(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (!isMatch) {
                            res.json({success: false, msg: 'Wrong password'});
                        } else {
                            const token = jwt.sign(user, config.secret, {expiresIn: 604800});
                            res.json({
                                success: true,
                                token: "JWT " + token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    username: user.username,
                                    email: user.email
                                }
                            });
                        }
                    });
                }
            })


        }


    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send(req.user);
});


module.exports = router;
