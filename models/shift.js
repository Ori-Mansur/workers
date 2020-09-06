var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var shiftSchema = new Schema({
    enter: {
        type: Date
    },
    exit: {
        type: Date
    },
    userId: {
        type: String
    }
});

module.exports = mongoose.model('shift', shiftSchema);