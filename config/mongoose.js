const mongoose = require('mongoose');
const env = require('./environment')
const URI= env.atlas_db_URI;

// mongoose.connect(`mongodb://127.0.0.1/${env.db}`);

mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;
