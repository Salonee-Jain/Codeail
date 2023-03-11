const mongoose = require('mongoose');
const env = require('./environment')
// const URI = `mongodb+srv://${env.atlas_db_user}:${env.atlas_db_pass}@cluster0.umrwoom.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(`mongodb://127.0.0.1/${env.db}`);

// mongoose.connect(URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;
