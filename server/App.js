const express=require('express')
const fs=require('fs')
const path=require('path')
const cors=require("cors");



const videos = [
    {
        id: 0,
        poster: '/video/0/poster',
        duration: '3 mins',
        name: 'Sample 1'
    },
    {
        id: 1,
        poster: '/video/1/poster',
        duration: '4 mins',
        name: 'Sample 2'
    },
    {
        id: 2,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Sample 3'
    },
];

const app=express();




//requesting a video form server to client side

app.get("/video",(req,res)=>{
    res.sendFile('assets/sample.mp4',{root:__dirname});
});

app.use(cors());
app.get('/videos',(req,res)=>res.json(videos));

app.listen(4000,()=>{
console.log('Listening on port 4000!')
});