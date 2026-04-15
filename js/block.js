let a = 10;
var b = 20;

{
  let a = 30;
  var b = 40;
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