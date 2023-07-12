const { gender } = require('../../constants/constants');

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 0 },
    gender: { type: Number, default: 0 },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true }
})

userSchema.index({ email: 1 }, { unique: true, sparse: true });

userSchema.pre('save', function save(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;