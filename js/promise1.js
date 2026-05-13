
// promise = pending , fullfilled, rejected 

let p1 = new Promise((resolve, reject) => {
         reject();
});

p1.then(()=>{
   console.log("I am successful")
}).catch(()=>{
    console.log("I have some errors")
});