const mongoose=require('mongoose')
const Schema=mongoose.Schema  //here schema is type of class

// we used new to change the class to object
const menuSchema=new Schema({
    name:  { type:String, required:true},
    image: { type:String, required:true},
    price: { type:Number, required:true},
    size:  { type:String, required:true}
    
})



module.exports=mongoose.model('menu',menuSchema)