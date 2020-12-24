const LocalStrategy = require('passport-local').Strategy;
const User= require('../models/user')
const bcrypt=require('bcrypt')

function Init(passport){   //done is a callback
        passport.use( new LocalStrategy({usernameField:'email' },async (email,password,done)=>{
        //login
        //check if email exist
        const user=await User.findOne({email:email})// find the user with this email
        if(!user){
            return done(null, false, { message: 'invalid email' })
        }
      
        bcrypt.compare(password,user.password).then(match=>{
              if(match){
                return done(null, user, { message: 'login  successfully' })

              }
              return done(null, false, { message: 'wrong username or password' }) /// we are saving the  user in done

          }).catch(err=>{
            return done(null, false, { message: 'something wentwrong' })
          })




         



        }))
        
        
        passport.serializeUser((user, done)=>{
            done(null, user._id)
     })

   passport.deserializeUser((id, done)=>{
       User.findById(id, (err, user)=>{
         done(err, user)
       })
     })
        // passport.serializeUser((user, done=>{
        //     done(null, user._id);
        //   }))

        // passport.deserializeUser((id, done)=>{
        //     User.findById(id, (err, user)=>{
        //       done(err, user);
        //     })
        //   })

}

module.exports=Init