function printStyle1(value){

  console.log("------------------------")
  console.log(value)
  console.log("------------------------")
}

function printStyle2(value){

  console.log("************************")
  console.log(value)
  console.log("************************")
}

function printStyle3(value){

  console.log("========================")
  console.log(value)
  console.log("========================")
}
function add (a, b, printFunc1, printFunc2){

    let c = a+b 
    printFunc1(c)
    printFunc2(c)
}

let p1 = 5
let p2 = 6
add(p1,p2,printStyle3,printStyle2 )