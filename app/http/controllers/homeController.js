const menu= require('../../models/menu')
// here we will work on a factory function.
function homeController(){
    return {
       async index(req, res){
           //when we use await  then we use async also  it's comulery
             const pizzas=await menu.find()
             return res.render('home', {Pizzas:pizzas})
             
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
module.exports=homeController