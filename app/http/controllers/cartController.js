// here we will work on a factory function.
// var express = require('express'); 
// var app = express(); 
// app.use(express.json()); 
function cartController(){
    return {
        cart(req, res){
            res.render('customer/cart')},

        update(req, res){
         if(!req.session.cart){
         req.session.cart={
                      items:{},        
                      totalqty:0,
                      totalprice:0
                     }
                 }
                 let cart =req.session.cart 
                // check if item does not exist in the cart
               if(!cart.items[req.body._id]){

                   cart.items[req.body._id]={
                       item: req.body,
                       qty:1
                   }
                   cart.totalqty=cart.totalqty+1
                   cart.totalprice=cart.totalprice+ req.body.price
         }else{
            cart.items[req.body._id].qty+=1
            cart.totalqty=cart.totalqty+1
            cart.totalprice=cart.totalprice+ req.body.price

         }

           return res.json({totalqty: req.session.cart.totalqty})
             
        }
    }

}




       // check if item does not exist in the cart
        //        if(!cart.items[req.body._id]){

        //            cart.items[req.body._id]={
        //                item: req.body,
        //                qty:1
        //            }
        //            cart.totalqty=cart.totalqty+1
        //            cart.totalprice=cart.totalprice+ req.body.price
        //  }else{
        //     cart.items[req.body._id].qty+=1
        //     cart.totalqty=cart.totalqty+1
        //     cart.totalprice=cart.totalprice+ req.body.price

        //  }


// above function return this object
// const object={
//     index(res, req){
//         res.render('home')
         
//     }
// }

//  Factory function --> A function which returns a object.
module.exports=cartController