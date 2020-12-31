// here we will work on a factory function.
const User= require('../../models/user')
const passport=require('passport')
const bcrypt=require('bcrypt')
function authController(){
    const _getRedirectUrl=(req)=>{
        return req.user.role==='admin' ? '/admin/order':'/'
    }
    return {
        register(req, res){
            res.render('Auth/Register')},

        async postregister(req, res){
           const {username , email, password} =req.body          //For validate user
           if(!username || !email || !password){                      // we used flash for for send the data in all front end part
               req.flash('error',"all fiels are required")  
                req.flash('name', username)                                                     // flash is a single time redirect if you redirect the data disappear
                req.flash('email', email)                                                     // flash is a single time redirect if you redirect the data disappear                                                    
               return res.redirect('/Register')
            //    console.log("details not provides")
           }

        //email id check                 //.exist takes 2 parameter 1. which is verify  2. err&result
         User.exists({email:email},(err,result)=>{   
            if(result){
            req.flash('error',"email already exist") 
            req.flash('name', username) 
            req.flash('email', email)
            return res.redirect('/Register')
            }
            })               


          // create user
          const hashpassword=await bcrypt.hash(password, 10)      // password hashing using bcrypt
          const user= new User({
              name:username,
              email:email,
              
              password:hashpassword
          })

         user.save().then((user)=>{
             return res.redirect('/login')
         }).catch(err=>{
            req.flash('error', 'something went wrong')
            return res.redirect('/Register')
         })

         
            // res.render('Auth/Register')
        },
        



        login(req, res){
            res.render('Auth/login')                 
           },

        logout(req, res,next){
             req.logout()
            //  req.session.destroy()
            return res.redirect('/login')   
                
           },
           //login system

        postlogin(req, res,next){
                                                                              //validate user
            const { email, password} =req.body
            if(!email || !password){                      // we used flash for for send the data in all front end part
                req.flash('error',"All fiels are required")  
                                                                   // flash is a single time redirect if you redirect the data disappear
                 req.flash('email', email)                                                     // flash is a single time redirect if you redirect the data disappear
                                                                
                return res.redirect('/login')
             //    console.log("details not provides")
                     }

            passport.authenticate('local', (err,user,info)=>{
                if(err){
                    req.flash('error', info.message)  
                    return next(err)
                }
                if(!user){
                    req.flash('error', info.message)  
                    return res.redirect('/login')
                }
                req.login(user,(err)=>{
                  if(err){
                    req.flash('error', info.message)  
                    return next(err)
                   }
                //   return res.redirect( _getRedirectUrl())
                  return res.redirect(_getRedirectUrl(req))
              
               } )
            } )(req,res,next) // this function will call itself it's have some strange behavior.
   
             
        } 

}
}
// above function return this object
// const object={
//     index(res, req){
//         res.render('home')
         
//     }
// }

//  Factory function --> A function which returns a object.
module.exports=authController