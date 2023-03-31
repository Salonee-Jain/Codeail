const express = require('express');
const cookieParser = require('cookie-parser');
const dotEnv = require('dotenv');
dotEnv.config();
const env = require('./config/environment');
const loger = require('morgan')

const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

const flash = require('connect-flash');
const cMiddleware = require('./config/middleware');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
// const cors = require('cors');
// app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:8000',
//     methods: "POST",

// }));


const chatServer = require('http').createServer(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen('5000');
console.log("Chat server running on port:  5000.")


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(loger(env.morgan.mode, env.morgan.options))

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//mongoose store is used to store all the session cookies in db
// set up the view engine

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

//session middleware with options
app.use(session({
    name:'Codeail',
    //TODO change secret before deployment
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled',
    },
    function(err){console.log(err || 'connet-mongo setup done')}

    )

    
})) 

app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(cMiddleware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});



