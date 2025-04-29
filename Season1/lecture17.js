// map, filter & reduce
const arr=[5,4,3,2,1];
function double(x){
    return x*2;
}

const doublearr= arr.map(double);
console.log(doublearr); 


// filter
function isOdd(y){
    return y % 2;
}
console.log(arr.filter(isOdd));


// reduce

const sumofEle=arr.reduce(function(sum,cur){
    sum = sum+cur;
    return sum;
},0);
console.log(sumofEle);


const output=arr.reduce(function(max,cur){
    if(cur>max){
        max=cur;

    }
    return max;
},0);
console.log(output);



const users = [
    { firstName: "Alok", lastName: "Raj", age: 23 },
    { firstName: "Ashish", lastName: "Kumar", age: 29 },
    { firstName: "Ankit", lastName: "Roy", age: 29 },
    { firstName: "Pranav", lastName: "Mukherjee", age: 50 },
  ];
 
  const out=users
  .filter((user) =>user.age<30)
  .map((user) =>user.firstName);
  console.log(out);




  const op=users.reduce((acc,cur)=>{
    if (cur.age<30){
        acc.push(cur.firstName);
    }
    return acc;
  },[]);
  console.log(op);