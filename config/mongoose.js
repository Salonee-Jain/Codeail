const mongoose = require('mongoose');
const URI = 'mongodb+srv://salonijain1936:Afiniafi4@cluster0.umrwoom.mongodb.net/test?retryWrites=true&w=majority'

// mongoose.connect('mongodb://127.0.0.1/codeial_development');

mongoose.connect(URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;
