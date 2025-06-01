//spider monkey 🐵 

import express from 'express'

import {Server} from 'socket.io'

import http from 'http'

import reportCrime from './controllers/APIs/reportCrime.js'
import getCrime from './controllers/APIs/getCrime.js'
const app= express();
const server = http.createServer(app)

const io = new Server(server);

let port= 8080;
  app.set('view engine','ejs')

 
 

app.use(express.static('public'));

app.use(reportCrime)
app.use(getCrime)

io.on("connect",(socket)=>{
    console.log("a nighah connected")
})
app.get('/',(req,res)=>{
    res.render('index.ejs')
})

server.listen(port,()=>{
    console.log('open on port 8080')
})
