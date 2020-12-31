const mongoose=require('mongoose')
const Schema=mongoose.Schema  //here schema is type of class

// we used new to change the class to object
const orderSchema=new Schema({

    customerId:{ type:mongoose.Schema.Types.ObjectId,            //use this function we are making the connection with user
                 ref:'user',
                 required:true
               },
    items:{ type:Object, required:true },
    address:  { type:String, required:true},
    contact: { type:String, required:true},
    paymentType: { type:String,default:'COD'},
    status: { type:String, default:'order_placed'}
   
},{timestamps: true})



module.exports=mongoose.model('order',orderSchema)