const Order= require('../../../models/order')


function orderController(){
    return {

        index(req,res){         
            Order.find({status:{$ne: 'completed'}}).populate('customerId').exec((err,orders)=>{      //for finding the reverse order we used null,{sort:{'createdAt':-1}

             
             if(req.xhr){
                 return res.json(orders)
             }else{
                // console.log('The author is %s', orders.customerId)
                
                return res.render('admin/order')               
            }
          })
            }     
}
}


// Order.find({status:{$ne: 'completed'}},null,{sort:{'createdAt':-1}}).
//   populate('customerId').
//   exec(function (err, orders) {
//     if (err) return handleError(err);
  
//         return orders.map(order => {
//             const propertyNames = Object.keys(order.customerId);

//    console.log(propertyNames);
            
//             console.log((order.customerId))
           
//         }).join('')
//     // prints "The author is Ian Fleming"
//   });




module.exports=orderController



// Order.
//   find({status:{$ne: 'completed'}},null,{sort:{'createdAt':-1}}).
//   populate('customerId').
//   exec(function (err, orders) {
//     if (err) return handleError(err);
//     console.log('The author is %s', Order.customerId.name);
//     // prints "The author is Ian Fleming"
//   });




























//   Order.find({status:{$ne: 'completed'}},null,{sort:{'createdAt':-1}}).      //for finding the reverse order we used null,{sort:{'createdAt':-1}
//   populate('customerId').exec((err,orders)=>{
   
//    if(req.xhr){
//        return res.json(orders)
//    }else{
//       return res.render('admin/order')
  
//   }
// })
