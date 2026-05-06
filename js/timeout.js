
// callback fuctions - setTimeout is callback fuction who is calling user define function 

function printMyNameCreater(name) {
    let pFunc = function print (){
        console.log(name)
    }
   return pFunc;
}

let pooja = printMyNameCreater("Pooja")


setTimeout(pooja, 5000)