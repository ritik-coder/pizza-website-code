// import the module
const express= require('express')
const app =express()
const ejs=require('ejs')
const path=require('path')
const expresslayout=require('express-ejs-layouts')


// define the port on for server
PORT=process.env.PORT || 3300


//use for the knowledge of server to tells about the file index
app.use(express.static('public'))

//set template engine
app.use(expresslayout)
app.set('views',path.join(__dirname,'resources/views'))
app.set('view engine','ejs')


//send the request
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/cart',(req,res)=>{
    res.render('customer/cart')
})

app.get('/login',(req,res)=>{
    res.render('Auth/login')
})
app.get('/register',(req,res)=>{
    res.render('Auth/Register')
})



//listen the port
app.listen(PORT,()=>{
   console.log(`your server is running on ${PORT} port`)
})
