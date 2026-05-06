/*variable type 

global - global scope 
var - function scope/ redefine/ redeclare
let - block scope / cannot redefine / can redeclare
const - cannot change/ block scope / cannot redefine
// we cannot redefined let variable but redeclare it 
// let a = 3
// a = 9
// we can redefine global variable 

// if parent is having let and child block is also having then it will consider as 2 diff variables 
// if parent is having let and child block is also having same variable with var then it will give an error 



  {
     let a = 5
    {
      console.log(a) //5
    }
  }
  
  {
    console.log(a) // error
  }*/
















let a = 10;
var b = 20;

{
  let a = 30;
  var b = 40;
  var b = 5
  const c = 50;
  d = 60;

  console.log("1:", a, b, c, d);
}

console.log("2:", a, b);

{
  console.log("3:", d);
  let d = 70;
  console.log("4:", d);
}

console.log("5:", d);