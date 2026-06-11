// //  string is palindrome
// function isPalindrome(str) {
//   const cleaned  = str.toLowerCase().replace(/[^a-z0-9]/g, '');
//   const reversed = cleaned.split('').reverse().join('');
//   return cleaned === reversed;
// }
// console.log(isPalindrome('racecar')); 

import { reverse } from "node:dns"

// // reverse string

// function reverseString(str) {
//   return str.split('').reverse().join('');
// }
// console.log(reverseString('playwright'));

// // Method 3 — Check number palindrome
// function isNumberPalindrome(num) {
//   const str = num.toString();
//   return str === str.split('').reverse().join('');
// }

// console.log(isNumberPalindrome(121));  

let str = "pooja"
let rev = str.split('').reverse().join('');
console.log(rev);