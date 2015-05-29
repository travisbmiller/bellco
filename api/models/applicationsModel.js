var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    firstName: { type: String, required: true },
    middleName: String,
    lastName: { type: String, required: true },
    preferredName: String,
    email: { type: String, unique: true, require: true },
    cellPhone: { type: String, require: true },
    homePhone: String,
    address: Object,
    questions: Object,
    positions: Object,
    jobPreferences: {
        fullTime: Boolean, 
        partTime: Boolean,
        wage: String,
    },
    availability: Object,
    preferredLocation: Array,
    schools: Object,
    jobs: Object,
    workedBeforeAtTacoBell: Object,
    submittedAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Application', userSchema);
 
