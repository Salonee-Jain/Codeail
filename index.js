const express = require('express')

const app = express();
const port = 8000

app.listen(port, (err)=>{
    if(err){
        // console.log("error connecting to client");
        //interpolation
        console.log(`error connecting to client ${err}`);
    }else{
        console.log(`connected to the port: ${port}`);
    }
})