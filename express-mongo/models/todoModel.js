var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tododb', { useMongoClient: true });

var todoSchema = new mongoose.Schema({
    pid: String,
    text: String,
    completed: Boolean
});

var model = mongoose.model('todo', todoSchema);

module.exports = model;