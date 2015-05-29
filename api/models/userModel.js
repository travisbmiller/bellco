var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var q = require('q');

var userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, require: true },
    password: String,
    createdAt: { type: Date, default: Date.now }
})

userSchema.pre('save', function(next) {

    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(12, function(err, salt) {

        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {

            user.password = hash;

            return next();

        });

    });

});

userSchema.methods.comparePassword = function(pass) {
    console.log("hit compared Password")
    var deferred = q.defer();

    bcrypt.compare(pass, this.password, function(err, isMatch) {

        if (err) {
            deferred.reject(err);
        }

        else {
            deferred.resolve(isMatch);
        }

    });

    return deferred.promise;

};


module.exports = mongoose.model('User', userSchema);