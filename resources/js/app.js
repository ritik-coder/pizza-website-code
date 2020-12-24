 import axios from 'axios' //axios lrary is used for post the dat to other page
import Noty from 'noty';  //NOTY is a notification library that makes it easy to create alert - success - error - warning 
let addtocart=document.querySelectorAll('.add_to_cart')
let cartcounter=document.querySelector('#cartcounter')

function updatecart(pizza){
    axios.post('/updatecart',pizza).then(res=>{
        console.log(res)
     // used  noty library for notification
        new Noty({
            type: 'success',
            timeout:1000,
            text: 'Item added to cart',
            progressBar: false

        }).show();
       cartcounter.innerText=res.data.totalqty
    }  ).catch(err=>{
        new Noty({
            type: 'error',
            timeout:1000,
            text: 'Something went wrong',
            progressBar: false

        }).show();
    })
}


addtocart.forEach((btn)=>{
        btn.addEventListener('click',(e)=>{
            let pizza=JSON.parse(btn.dataset.pizza) //JSON.parse basicially used for convert the string  into object
           
            updatecart(pizza)

        })
})