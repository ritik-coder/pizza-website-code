// import the module
require('dotenv').config() // using this tline we can access all the variable  of the .env file
const express= require('express')
const app =express()  // app is an instance of express
const ejs=require('ejs')
const path=require('path')
const bcrypt=require('bcrypt')
const passport=require('passport')
const expresslayout=require('express-ejs-layouts')
const mongoose=require('mongoose')
const flash = require('express-flash') // work as middleware between server and client
const session=require('express-session')
const Emitter=require('events')

const Mongodb= require('connect-mongo')(session) //basicially to store the cokkies  in the mongo db we use the connect-mongo
// define the port on for server
PORT=process.env.PORT || 3300


//use for the knowledge of server to tells about the file index
app.use(express.static('public'))

//set template engine
app.use(expresslayout)
app.set('views',path.join(__dirname,'resources/views'))
app.set('view engine','ejs')




//database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify : true  });
connection=mongoose.connection;
connection.once('open', ()=>{
    console.log('database connected');
}).catch( err=>{
    console.log('connection failed')
});





// session store  (using this logic our data will we store in our database)

const mongodb=new Mongodb({
    mongooseConnection:connection,   // here alraeady defined that it will takes two parameter 1. mongooseConnection 2.collection
   collection: 'sessions'
})



// Event Emitter
const eventEmitter=new Emitter()           // If you want to use eventEmitterthen you need to use same instance at every where
app.set('eventEmitter', eventEmitter)     // using this function we can bind eventEmitter now using only key we can use it everywhere 



//session
app.use(session({
    secret: process.env.COOKIES_SECRET,   // for acess the cokkies variable we use this syntax before variable
    resave: false,
    store:mongodb,     // we defined that our session store in mongo db other it will store it in the randomly any where
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 24 * 60}
}))

app.use(flash()) // it's works as an middle ware
app.use(express.urlencoded({extended: false}))
app.use(express.json())


//passport configuration
const passportInit=require('./app/config/passport')
passportInit(passport)

app.use(passport.initialize())
app.use(passport.session())




// global middleware is a function, it's position is very important in this session
app.use((req, res, next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})


//import the  initroutes function
// require('./routes/web')  this function gives a function so we need to call it.
require('./routes/web')(app)


//listen the port
const server=app.listen(PORT,()=>{
   console.log(`your server is running on ${PORT} port`)
})


// make a socket
const io = require('socket.io')(server)

io.on('connection',(socket)=>{
      //join  
      socket.on('join',(orderId)=>{
      socket.join(orderId)    // we created a room on the server of fixed id     
    })
})
//orderedupdated event
eventEmitter.on('orderUpdated',(data)=>{
    io.to(`order_${data.id}`).emit('orderUpdated',data)
})


eventEmitter.on('orderPlaced',(order)=>{
    io.to('adminRoom').emit('orderPlaced',order)
})