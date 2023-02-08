const express = require('express')

const app = express();
const port = 8000

app.use('/', require('./routes/index'))

app.set('view engine', 'ejs')
app.set('views', './views')




app.listen(port, (err)=>{
    if(err){
        // console.log("error connecting to client");
        //interpolation
        console.log(`error connecting to client ${err}`);
    }else{
        console.log(`connected to the port: ${port}`);
    }
})