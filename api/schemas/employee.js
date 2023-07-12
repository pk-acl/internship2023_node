const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const empSchema = new schema({
    userId: {type: schema.Types.ObjectId, ref: 'User'},
    experience: {type: Number, required: true},
    skills: {type: [String]}
});

const Employee = mongoose.model('Employee', empSchema);

module.exports = Employee;