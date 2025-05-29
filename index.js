//spider monkey 🐵 

const express = require('express');
const app= express();
let port= 8080;
  app.set('view-engine','ejs')

 app.use((req,res,next)=>{
    res.locals.baseUrl =  process.env.BASE_URL;
    next();
 })
 
 
 

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.listen(port,()=>{
    console.log('open on port 8080')
})