const checkeven =new Promise((resolve,reject) => {
    let num =2;
    if(num % 2 === 0) resolve("the num is even");
        else reject("the num is not even");
})

checkeven
.then((message) => console.log(message))
.catch((message) => console.log(message));