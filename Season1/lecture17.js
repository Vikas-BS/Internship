// // map, filter & reduce
// const arr=[5,4,3,2,1];
// function double(x){
//     return x*2;
// }

// const doublearr= arr.map(double);
// console.log(doublearr); 


// // filter
// function isOdd(y){
//     return y % 2;
// }
// console.log(arr.filter(isOdd));


// // reduce

// const sumofEle=arr.reduce(function(sum,cur){
//     sum = sum+cur;
//     return sum;
// },0);
// console.log(sumofEle);


// const output=arr.reduce(function(max,cur){
//     if(cur>max){
//         max=cur;

//     }
//     return max;
// },0);
// console.log(output);



// const users = [
//     { firstName: "Alok", lastName: "Raj", age: 23 },
//     { firstName: "Ashish", lastName: "Kumar", age: 29 },
//     { firstName: "Ankit", lastName: "Roy", age: 29 },
//     { firstName: "Pranav", lastName: "Mukherjee", age: 50 },
//   ];
 
//   const out=users
//   .filter((user) =>user.age<30)
//   .map((user) =>user.firstName);
//   console.log(out);




//   const op=users.reduce((acc,cur)=>{
//     if (cur.age<30){
//         acc.push(cur.firstName);
//     }
//     return acc;
//   },[]);
//   console.log(op);



const users = [
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      posts: [
        {
          id: 101,
          title: "Post A",
          comments: [
            { id: 1001, text: "Nice post!", likes: 2 },
            { id: 1002, text: "Thanks for sharing", likes: 5 }
          ]
        },
        {
          id: 102,
          title: "Post B",
          comments: [
            { id: 1003, text: "Interesting!", likes: 3 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      posts: [
        {
          id: 103,
          title: "Post C",
          comments: []
        }
      ]
    }
  ];

  const userid= users
  .map((user) => user.id)
  

  console.log(userid);

  const postid = users
  .map((user => user.posts.map(posts=>posts.id)))
  .reduce((acc, id) => acc.concat(id), []);
  console.log(postid);

  const commentid = users
  .map((user => user.posts.map(post=>post.comments.map(comments => comments.id))))
  .reduce((acc,id) => acc.concat(id.reduce((acc,id) => acc.concat(id),[])),[]);
  console.log(commentid);