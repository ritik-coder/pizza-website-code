const mongoose=require('mongoose')
const Schema=mongoose.Schema  //here schema is type of class

// we used new to change the class to object
const userSchema=new Schema({
    name:  { type:String, required:true},
    password: { type:String, required:true},
    email: { type:String, required:true, unique:true},

    
})



module.exports=mongoose.model('user',userSchema)