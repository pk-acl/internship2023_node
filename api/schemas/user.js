const { gender } = require('../../constants/constants');

const mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, default: 0},
    gender: {type: Number, default: 0},
    password: {type: String, required: true},
    email: {type: String, required: true},
    isActive: {type: Boolean, default: true}
})

userSchema.index({email: 1}, {unique: true, sparse: true});

userSchema.pre('save', function save(next) {
    const user = this;

    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        })
    });
})

userSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compare(password, user.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;