var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    preferredName: String,
    email: String,
    cellPhone: String,
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
    submittedAt: { type: Date, default: Date.now },
    seen: {type: Boolean, default: false}

})

module.exports = mongoose.model('Application', userSchema);
 
