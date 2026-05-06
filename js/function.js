// function = service 

// var variable outside the func behave as global variable 
// but inside the func it is only fucntion scoped 



function add(a,b){

   let c = a+b; 
   return c;

}

function sub (a,b){
   
    let c = a - b; 
   return c;
}



/*console.log(add(5,9))
console.log(sub(10,6))
console.log(mul(2,9))*/

// Functions also hoisted 

let result = sub(5,5)
console.log(result)

function sub (a,b){
   
    let c = a - b; 
   return c;
}


// in JS fuctions are variables
let d = Pooja(8,9)

let Pooja = function mul (a,b){
   return a*b; 
}

//let d = Pooja(8,9)
console.log(d)

