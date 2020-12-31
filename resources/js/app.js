import axios from 'axios' //axios lrary is used for post the dat to other page
import Noty from 'noty' //NOTY is a notification library that makes it easy to create alert - success - error - warning 
import { initAdmin } from './admin.js'
import moment from 'moment'
// const lib = require("./admin");

let addtocart=document.querySelectorAll('.add_to_cart')
let cartcounter=document.querySelector('#cartcounter')

function updatecart(pizza){
    axios.post('/updatecart',pizza).then(res=>{
        // console.log(res)
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

const ordersuccess= document.querySelector('#ordersuccess')
if(ordersuccess){
    setTimeout(()=>{
           ordersuccess.remove()
    },2000)
}

// initAdmin()
// initAdmin()


//order status

let status=document.querySelectorAll('.status_line')
// console.log(status)

let hiddenInput=document.querySelector('#hidden-input')
let order= hiddenInput ? hiddenInput.value : null
order= JSON.parse(order)
let time=document.createElement('small')
// console.log(order)

function updatestatus(order){
    status.forEach((status)=>{
        status.classList.remove('completed')
        status.classList.remove('current')
    })
    let stepCompleted=true

    status.forEach((status)=>{
          let dataproperty=status.dataset.status

          if(stepCompleted){
             status.classList.add('completed')
          }

          if(order.status===dataproperty){

             time.innerText=moment(order.updatedAt).format('hh:mm A')
             status.appendChild(time)

              stepCompleted=false
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
            }


        })

}
updatestatus(order);


//server
let socket =io()
initAdmin(socket)
// make a join request   for rooom
if(order){
    socket.emit('join',`order_${order._id}`)
}


// make a join request admin for rooom
let adminareapath=window.location.pathname
// console.log(adminareapath)
if(adminareapath.includes('admin')){
    socket.emit('join',`adminRoom`)
}

socket.on('orderUpdated',(data)=>{
     const updateOrder={...order}// recieve a copy of any object
     updateOrder.updatedAt=moment().format()
     updateOrder.status=data.status
     updatestatus(updateOrder)
     new Noty({
        type: 'success',
        timeout:1000,
        text: 'Order Updated',
        progressBar: false

    }).show();
    //  console.log(updateOrder)
})