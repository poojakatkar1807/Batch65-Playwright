// returning a function 

// high order fuction can return fuction and also use as parameter 

function multipliar(x){

    let reFunc = function multiply(a){  // can write arrow function as well (a) => {}
        return a * x;
    }
    return reFunc;
}

let n = multipliar(5);
let mulby9 = multipliar(9);

//console.log(n(3));
console.log(mulby9(7));
