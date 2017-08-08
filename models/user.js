const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pinlist: [{
        title: String,
        link: String,
        time: Number,
        likednumber: Number,
    }],
    likedlist: [String]
});
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.checkExist = function (newUser, callback) {
    const query = {email: newUser.email};
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
    const query = {email: email};
    User.findOne(query, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, callback);
};

module.exports.addlink = function (id, title, link, callback) {
    User.findById(id, (err, user) => {
        if (err) throw err;
        const newlist = {
            title: title,
            link: link,
            time: new Date().getTime(),
            likednumber: 0,
        };
        user.pinlist.push(newlist);
        user.save(callback);
    })
};

module.exports.deletlink = function (userid, linkid, callback) {
    User.findById(userid, (err, user) => {
        if (err) throw err;
        //pull can delet this obj in subDocument
        user.pinlist.pull({_id: linkid});
        user.save(callback);
    })
};
// add the link to my like list
module.exports.addliketomylist = function (userid, linkid, callback) {
    User.findById(userid, (err, user) => {
        if (err) throw err;
        user.likedlist.push(linkid);
        user.save(callback);
    })
};
// remove the link from my like list
module.exports.removelikefrommylist = function (userid, linkid, callback) {
    User.findById(userid, (err, user) => {
        if (err) throw err;
        let tem = user.likedlist.slice();
        user.likedlist = tem.filter((link) => {
            return link !== linkid;
        });
        user.save(callback);
    })
};

module.exports.getmylink = function (userid, callback) {
    User.findById(userid, callback);
};

module.exports.getalllink = function (callback) {
    User.find({}, callback)
};
// make the like number incre by 1
module.exports.increonelike = function (linkid, callback) {
    User.findOne({"pinlist._id": linkid}, (err, user) => {
        if (err) throw err;
        user.pinlist.map((link) => {
            if (link._id.toString() === linkid) {
                link.likednumber++;
            }
        });
        user.save(callback);
    });
};

// make the like number decr by 1
module.exports.decreonelike = function (linkid, callback) {
    User.findOne({"pinlist._id": linkid}, (err, user) => {
        if (err) throw err;
        user.pinlist.map((link) => {
            if (link._id.toString() === linkid) {
                if (link.likednumber >= 1) {
                    link.likednumber--;
                }
            }

        });
        user.save(callback);
    });
};

module.exports.mylike = function (userid, callback) {
    User.findById(userid, callback);
};
