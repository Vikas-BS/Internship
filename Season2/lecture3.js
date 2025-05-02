//asyns & await 

// async function f() {
//     let promise = new Promise((resolve,reject)=>{
//         setTimeout(()=>resolve( "done"),1000)
//     });
//     let result=await promise;
//     alert(result);
// }
// f();



async function showAvatar(){
    let response = await fetch('https://avatar.iran.liara.run/public/boy');
    let user = await response.json();

    let ghithubresponse =await fetch('https://api.github.com/users/alok722');
    let githubUser = await ghithubresponse.json();

    let img = document.createElement('img');
    img.src =ghithubUser.avatar_url;
    img.className= 'promise-avatar-example';
    document.body.append(img);

    await new Promise ((resolve,reject)=>{
        setTimeout(resolve,3000);
    })
    img.remove();
    return githubUser;
}
showAvatar();