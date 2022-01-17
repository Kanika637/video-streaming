const express=require("express");
const app=express();

app.use('/',(req,res)=>{
    res.send("APp is running");
});

module.exports=app;