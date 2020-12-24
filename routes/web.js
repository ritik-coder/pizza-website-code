// make a function for routes
const homeController=require('../app/http/controllers/homeController')
const cartController=require('../app/http/controllers/cartController')
const authController=require('../app/http/controllers/authController')
const guest=require('../app/http/middleware/logout')

function InitRoutes(app){

    // app.get('/login',(req,res)=>{
    //     res.render('Auth/login')
    // })   

app.get('/',homeController().index)  // here we are going to call a 'index' method on a function 'homecontroller'.and on this 
                                      // and  this function 'homeController().index' getting (req,res ).
app.get('/cart',cartController().cart)


app.get('/login',guest,authController().login)
app.post('/login',authController().postlogin)
app.post('/logout',authController().logout)
app.get('/Register',guest,authController().register)
app.post('/Register',authController().postregister)
app.post('/updatecart',cartController().update)


}
// export the Initroutes function
module.exports=InitRoutes



