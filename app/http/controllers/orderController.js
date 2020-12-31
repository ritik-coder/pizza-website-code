const Order= require('../../models/order')
const moment= require('moment')
function orderController(){
    return{


    // code for fetch the database details of the order
                         // we can use different type of callbacks for fetching the database
                         // {a}-->we can use promises likes then and catch function
                         // {b}-->we can use async and await function

            async index(req,res){
            const order=await Order.find({customerId: req.user._id},null,{sort:{'createdAt':-1}}) //for finding the reverse order we used null,{sort:{'createdAt':-1}
            res.render('customer/order',{orders: order,moment:moment})
            // console.log(order)
            },
             

            async showorder(req,res){
                 const order=await Order.findById(req.params.id)
                 console.log(order)
                 if(req.user._id.toString()===order.customerId.toString()){
                     
                     return res.render('customer/singleOrder',{order:order})
                 }
                     return res.redirect('/order')
            },
    



    // code for fetch the shipping details and save in the order
           postorder(req,res){

            //check the validate order
            const {address, contact} =req.body          
            if(!address || !contact){                         // we used flash for send the data in all front end part in  this session
                req.flash('error',"All fiels are required")   // flash is a single time redirect if you redirect the data disappear                                                    
                return res.redirect('/cart')              
              }    

            // make an order
            const order= new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                contact: contact,
                address: address
            }) 

            //save the order   // Oredr.populate('customerId').exec((err,placedorders)=>{})
            order.save().then(result=>{  
                Order.populate(result, {path:'customerId'},(err,placedorder)=>{  

                const eventEmitter=req.app.get('eventEmitter')
                eventEmitter.emit('orderPlaced',placedorder)
                req.flash('success','Order placed successfully')  
                delete req.session.cart
                return res.redirect('/order')  
            })

            }).catch(err=>{
                req.flash('error','Something went wrong')
               return res.redirect('/cart')
            })

  }
        


}    
}
module.exports=orderController