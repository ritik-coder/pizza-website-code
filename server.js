// import the module
const express= require('express')
const app =express()
const ejs=require('ejs')
const path=require('path')
const expresslayout=require('express-ejs-layouts')


// define the port on for server
PORT=process.env.PORT || 3300


//send the request
app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})


//set template engine
app.use(expresslayout)
app.set('views',path.join(__dirname,'resources/views'))
app.set('view engine','ejs')


//listen the port
app.listen(PORT,()=>{
   console.log(`your server is running on ${PORT} port`)
})
