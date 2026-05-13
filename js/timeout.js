
// callback fuctions - setTimeout is callback fuction who is calling user define function 

function printMyNameCreater(name) {
    let pFunc = function print (){
        console.log(name)
    }
   return pFunc;
}

let pooja = printMyNameCreater("Pooja")
let payal = printMyNameCreater("Payal")



setTimeout(pooja, 5000)

//setInterval(payal,1000)

//JS async language , single threaded 