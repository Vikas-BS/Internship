// const cart=["shoes","pant","kurta"];

// const promise=createOrder(cart);
// promise.
// then(function(orderid){
//     console.log(orderid);
// });

// function createOrder(cart){
//     const pr=new Promise(function(resolve,reject){
//         if(!validatecart){
//             reject("cart is not valid");
//         }
//         const orderid="1234";
//         if(orderid){
//             resolve(orderid);
//         }
//     });
//     return pr;

// }
// function validatecart(){
//     return true;
// }



// using of catch


// const cart=["shoes","pant","kurta"];
// function proceedtopayment(orderid){
//     console.log(orderid);
// }

// const promise=createOrder(cart);
// promise
// .then(function(orderid){
//     proceedtopayment(orderid);
// })
// .catch(function(err){
//     console.log(err.message);

// });

// function createOrder(cart){
//     const pr=new Promise(function(resolve,reject){
//         if(!validatecart(cart)){
//             const err =new Error("cart is not valid")
//             reject(err);
//         }
//         const orderid="1234";
//         if(orderid){
//             resolve(orderid);
//         }
//     });
//     return pr;

// }
// function validatecart(){
//     return false;
// }


//Promise chain

const cart=["shoes","pant","kurta"];



const promise=createOrder(cart);
promise
.then(function(orderid){
    console.log(orderid);
    return (orderid);
})
.catch(function(err){
    console.log(err.message);

})

.then(function (orderid){
    return proceedtopayment(orderid);
})
.then(function (paymentinfo){
    console.log(paymentinfo);

})
.catch(function(err){
    console.log(err.message);

})

function createOrder(cart){
    const pr=new Promise(function(resolve,reject){
        if(!validatecart(cart)){
            const err =new Error("cart is not valid")
            reject(err);
        }
        const orderid="1234";
        if(orderid){
            resolve(orderid);
        }
    });
    return pr;

}

function proceedtopayment(cart){
    return new Promise(function(resolve,reject){
        if(validatecart(cart)){
            resolve ("paymenyt successful");
        }
        else{
            const err =new Error("Attention you are proceeding to the payment")
            reject(err);
            
        }

    });
    

}
function validatecart(){
    return false;
}