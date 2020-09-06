var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var workerSchema = new Schema({
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

module.exports = mongoose.model('worker', workerSchema);