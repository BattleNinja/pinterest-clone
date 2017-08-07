const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.post('/addlink', passport.authenticate('jwt', {session: false}), (req, res) => {
    const id = req.user._id;
    const title = req.body.title;
    const link = req.body.link;
    User.addlink(id, title, link, (err, user) => {
        if (err) throw err;
        res.json(user.pinlist[user.pinlist.length - 1]);
    });
});

router.post('/deletlink', passport.authenticate('jwt', {session: false}), (req, res) => {
    const userid = req.user._id;
    const linkid = req.body.linkid;
    User.deletlink(userid, linkid, (err, response) => {
        // if (err) throw err;
        res.send(linkid + 'has been deleted');
    });
});

// like----------------------

router.post('/like', passport.authenticate('jwt', {session: false}), (req, res) => {
    const userid = req.user._id;
    const linkid = req.body.linkid;
    User.addliketomylist(userid, linkid, (err, response) => {
        if (err) throw err;
        User.increonelike(linkid, (err, user) => {
            if (err) throw err;
            res.json('lik number has incre by 1');
        });

    });
});

// cancel like----------------
router.post('/unlike', passport.authenticate('jwt', {session: false}), (req, res) => {
    const userid = req.user._id;
    const linkid = req.body.linkid;
    User.removelikefrommylist(userid, linkid, (err, response) => {
        if (err) throw err;

        User.decreonelike(linkid, (err, user) => {
            if (err) throw err;
            res.json(linkid + 'has been unliked');
        });
    });
});

router.get('/mylink', passport.authenticate('jwt', {session: false}), (req, res) => {
    const userid = req.user._id;
    User.getmylink(userid, (err, response) => {
        if (err) throw err;
        res.json(response.pinlist)
    });
});

router.get('/alllink', (req, res) => {
    User.getalllink((err, users) => {
        if (err) throw err;
        let links = [];
        users.map((user) => {
            links = [...links, ...user.pinlist]
        });
        res.json(links);
    });
});

router.get('/mylike', passport.authenticate('jwt', {session: false}), (req, res) => {
    const userid = req.user._id;
    User.mylike(userid, (err, user) => {
        if (err) throw err;
        res.json(user.likedlist);
    });
});


module.exports = router;
