// make a function for routes
const homeController=require('../app/http/controllers/homeController')
const cartController=require('../app/http/controllers/cartController')
const authController=require('../app/http/controllers/authController')
const orderController=require('../app/http/controllers/orderController')
const adminorderController=require('../app/http/controllers/admin/orderController')
const statusController=require('../app/http/controllers/admin/statusController')

//middleware
const guest=require('../app/http/middleware/logout')
const auth=require('../app/http/middleware/auth')
const admin=require('../app/http/middleware/admin')

function InitRoutes(app){

    // app.get('/login',(req,res)=>{
    //     res.render('Auth/login')
    // })   

app.get('/',homeController().index)  // here we are going to call a 'index' method on a function 'homecontroller'.and on this 
                                      // and  this function 'homeController().index' getting (req,res ).

 //auth routes                                                                      
app.get('/login',guest,authController().login)
app.post('/login',authController().postlogin)
app.post('/logout',authController().logout)
app.get('/Register',guest,authController().register)
app.post('/Register',authController().postregister)

//customer cart routes
app.post('/updatecart',cartController().update)
app.get('/cart',cartController().cart)
app.get('/order',auth,orderController().index)
app.post('/order',auth,orderController().postorder)
app.get('/order/:id',orderController().showorder)



// admin routes
app.get('/admin/order',admin,adminorderController().index)
app.post('/admin/order/status',admin,statusController().update)


}
// export the Initroutes function
module.exports=InitRoutes



