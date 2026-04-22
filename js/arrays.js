// arrays - collection 

/*var marks = [10,90,80,100]
 console.log(marks)
 //console.log(marks[3]) // undefined 

 //push function - add element in last

 marks.push(63)
 console.log(marks)

 //unshift - add elemet in start

 marks.unshift(6)
 console.log(marks)

 // pop - will remove element from last 
 marks.pop()
 console.log(marks)
 
 //shift - remove element from start
  marks.shift()
 console.log(marks)

 // sort 
 console.log(marks.sort())*/

 //slice 
 var marks = [10,90,80,3,6,5,99]
  //console.log(marks.slice(2,5)) 

//splice - remove and add elements in bet of array 
// splice(from index, delete count, add values)

marks.splice(2,0,5,55)
console.log(marks)