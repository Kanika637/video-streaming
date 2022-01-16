const express=require('express')
const fs=require('fs')
const path=require('path')
const cors=require('cors');

const app=express();

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

//requesting a video form server to client side
// app.get("/video",(req,res)=>{
//     res.sendFile('assets/sample.mp4',{root:__dirname});
// });

app.use(cors());
app.get('/videos', (req,res)=>res.json(videos));

app.get('video/:id/data', (req,res)=>{
    const id=parseInt(req.params.id, 10);
    res.json(videos[id]);
})

app.get('/video/:id', (req,res)=>{
    const path=`assets/${req.params.id}.mp4`;
    const stat=fs.statSync(path);
    const fileSize=stat.size;
    const range=req.headers.range;

    if(range){

        // sending the video in chunksand the browser has send the range
        const parts=range.replace(/bytes=/,"").split("-");
        //converts a string to a integer
        const start=parseInt(parts[0],10);

        const end=parts[1] ? parseInt(parts[1],10):fileSize-1;
        const chunksize=(end-start)+1;
        const file=fs.createReadStream(path,{start,end});

        const head={
            'Content-Range':`bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges':'bytes',
            'Content-Length':chunksize,
            'Content-Type':'video/mp4,'
        };
        res.writeHead(206,head);
        file.pipe(res);
    }else{
        const head={
            'Content-Length':fileSize,
            'Content-Type':'video/mp4',
        };
        res.writeHead(200,head);
        fs.createReadStream(path).pipe(res);
    }
});

app.listen(4000,()=>{
console.log('Listening on port 4000!')
});