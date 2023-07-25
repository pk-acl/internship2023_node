const mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

const bcryptjs = require('bcryptjs');

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

    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        })
    });
})

userSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcryptjs.compareSync(password, user.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;