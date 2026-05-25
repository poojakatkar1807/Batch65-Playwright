Here are the top 10 JavaScript codes asked in automation testing interviews:

---

# Top 10 JavaScript Codes Asked in Automation Testing Interview

---

## 1. Reverse a String

One of the most commonly asked JavaScript coding questions in any interview including automation testing.

```javascript
// Method 1 — Using split, reverse, join (Most popular)
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString('hello'));       // "olleh"
console.log(reverseString('playwright'));  // "thgirwyalp"
console.log(reverseString('automation')); // "noitamotua"


// Method 2 — Using for loop
function reverseStringLoop(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

console.log(reverseStringLoop('testing')); // "gnitset"


// Method 3 — Using reduce
function reverseStringReduce(str) {
  return str.split('').reduce((acc, char) => char + acc, '');
}

console.log(reverseStringReduce('selenium')); // "muineles"


// Method 4 — Using spread operator
function reverseStringSpread(str) {
  return [...str].reverse().join('');
}

console.log(reverseStringSpread('cypress')); // "sserbyc"
```

**Why it is asked:**
- Tests basic string manipulation knowledge
- Checks if you know built-in array methods
- Interviewer wants to see multiple approaches

---

## 2. Check if a String is a Palindrome

Very commonly asked in automation interviews to test string manipulation and logic.

```javascript
// Method 1 — Compare with reversed string
function isPalindrome(str) {
  const cleaned  = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

console.log(isPalindrome('racecar'));       // true
console.log(isPalindrome('hello'));         // false
console.log(isPalindrome('A man a plan a canal Panama')); // true
console.log(isPalindrome('Was it a car or a cat I saw')); // true
console.log(isPalindrome('automation'));    // false


// Method 2 — Using two pointer approach
function isPalindromePointer(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left  = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

console.log(isPalindromePointer('madam'));  // true
console.log(isPalindromePointer('level'));  // true
console.log(isPalindromePointer('world'));  // false


// Method 3 — Check number palindrome
function isNumberPalindrome(num) {
  const str = num.toString();
  return str === str.split('').reverse().join('');
}

console.log(isNumberPalindrome(121));   // true
console.log(isNumberPalindrome(1221));  // true
console.log(isNumberPalindrome(123));   // false
```

**Why it is asked:**
- Tests string and array manipulation
- Tests logical thinking
- Checks knowledge of regex and cleaning input

---

## 3. Find Duplicate Elements in an Array

Extremely common in automation interviews. Tests knowledge of arrays and objects.

```javascript
// Method 1 — Using filter and indexOf
function findDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) !== index);
}

console.log(findDuplicates([1, 2, 3, 2, 4, 3, 5]));
// [2, 3]

console.log(findDuplicates(['apple', 'banana', 'apple', 'cherry', 'banana']));
// ['apple', 'banana']


// Method 2 — Using Set (Most efficient)
function findDuplicatesSet(arr) {
  const seen       = new Set();
  const duplicates = new Set();

  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  return [...duplicates];
}

console.log(findDuplicatesSet([1, 2, 3, 2, 4, 3, 5, 1]));
// [2, 3, 1]


// Method 3 — Using reduce and object
function findDuplicatesReduce(arr) {
  const count = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(count).filter(key => count[key] > 1);
}

console.log(findDuplicatesReduce([1, 2, 2, 3, 3, 3, 4]));
// ['2', '3']


// Method 4 — Count occurrences of each element
function countOccurrences(arr) {
  const count = {};
  arr.forEach(item => {
    count[item] = (count[item] || 0) + 1;
  });
  return count;
}

console.log(countOccurrences([1, 2, 2, 3, 3, 3, 4]));
// { '1': 1, '2': 2, '3': 3, '4': 1 }
```

**Why it is asked:**
- Tests array manipulation skills
- Tests knowledge of Set, filter, reduce
- Common in data validation scenarios in testing

---

## 4. Find the Largest and Smallest Number in an Array

A fundamental coding question asked in almost every automation testing interview.

```javascript
// Method 1 — Using Math.max and Math.min with spread
function findLargestSmallest(arr) {
  const largest  = Math.max(...arr);
  const smallest = Math.min(...arr);
  return { largest, smallest };
}

console.log(findLargestSmallest([3, 1, 9, 5, 2, 8, 4]));
// { largest: 9, smallest: 1 }


// Method 2 — Using sort
function findLargestSmallestSort(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  return {
    smallest: sorted[0],
    largest:  sorted[sorted.length - 1]
  };
}

console.log(findLargestSmallestSort([10, 3, 56, 2, 100, 45]));
// { smallest: 2, largest: 100 }


// Method 3 — Using for loop (manual approach)
function findLargestSmallestLoop(arr) {
  let largest  = arr[0];
  let smallest = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest)  largest  = arr[i];
    if (arr[i] < smallest) smallest = arr[i];
  }
  return { largest, smallest };
}

console.log(findLargestSmallestLoop([7, 2, 14, 5, 19, 1]));
// { largest: 19, smallest: 1 }


// Method 4 — Using reduce
function findLargestSmallestReduce(arr) {
  return arr.reduce((acc, curr) => ({
    largest:  curr > acc.largest  ? curr : acc.largest,
    smallest: curr < acc.smallest ? curr : acc.smallest
  }), { largest: arr[0], smallest: arr[0] });
}

console.log(findLargestSmallestReduce([4, 8, 1, 6, 3, 9]));
// { largest: 9, smallest: 1 }


// Second largest number — also commonly asked
function findSecondLargest(arr) {
  const unique = [...new Set(arr)].sort((a, b) => b - a);
  return unique[1];
}

console.log(findSecondLargest([3, 1, 9, 9, 5, 7])); // 7
```

**Why it is asked:**
- Tests knowledge of Math methods
- Tests array sorting and manipulation
- Checks multiple approaches to the same problem

---

## 5. Remove Duplicates from an Array

Very commonly asked in automation interviews especially for data cleanup scenarios.

```javascript
// Method 1 — Using Set (Simplest and most popular)
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));
// [1, 2, 3, 4, 5]

console.log(removeDuplicates(['a', 'b', 'a', 'c', 'b']));
// ['a', 'b', 'c']


// Method 2 — Using filter and indexOf
function removeDuplicatesFilter(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

console.log(removeDuplicatesFilter([1, 1, 2, 3, 3, 4]));
// [1, 2, 3, 4]


// Method 3 — Using reduce
function removeDuplicatesReduce(arr) {
  return arr.reduce((acc, item) => {
    if (!acc.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
}

console.log(removeDuplicatesReduce([5, 3, 5, 1, 3, 2]));
// [5, 3, 1, 2]


// Method 4 — Remove duplicates from array of objects
function removeDuplicateObjects(arr, key) {
  return arr.filter((item, index, self) =>
    index === self.findIndex(obj => obj[key] === item[key])
  );
}

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob'   },
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Carol' },
];

console.log(removeDuplicateObjects(users, 'id'));
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Carol' }]
```

**Why it is asked:**
- Very common data processing task in test automation
- Tests knowledge of Set, filter, reduce
- Practical skill for cleaning test data

---

## 6. Flatten a Nested Array

Asked frequently in automation interviews. Tests knowledge of recursion and modern array methods.

```javascript
// Method 1 — Using flat() with depth
function flattenArray(arr) {
  return arr.flat(Infinity); // Infinity flattens all levels
}

console.log(flattenArray([1, [2, 3], [4, [5, 6]]]));
// [1, 2, 3, 4, 5, 6]

console.log(flattenArray([1, [2, [3, [4, [5]]]]]));
// [1, 2, 3, 4, 5]


// Method 2 — Using recursion
function flattenRecursive(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenRecursive(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

console.log(flattenRecursive([1, [2, [3, [4]]]]));
// [1, 2, 3, 4]


// Method 3 — Using reduce and recursion
function flattenReduce(arr) {
  return arr.reduce((acc, item) =>
    Array.isArray(item)
      ? acc.concat(flattenReduce(item))
      : acc.concat(item),
    []
  );
}

console.log(flattenReduce([1, [2, 3], [4, [5, [6]]]]));
// [1, 2, 3, 4, 5, 6]


// Method 4 — Flatten only one level deep
function flattenOneLevel(arr) {
  return arr.flat(1);
}

console.log(flattenOneLevel([1, [2, 3], [4, [5, 6]]]));
// [1, 2, 3, 4, [5, 6]]  ← [5,6] stays nested
```

**Why it is asked:**
- Tests recursion knowledge
- Tests understanding of flat() method
- Common in processing nested test data responses

---

## 7. Promises and Async/Await

The most important JavaScript concept for automation testing. Always asked in Playwright and Cypress interviews.

```javascript
// ── 1. Creating and using a basic Promise
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: 'Alice', email: 'alice@test.com' });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

// Using .then() and .catch()
fetchUserData(1)
  .then(user  => console.log('User:', user.name))   // User: Alice
  .catch(err  => console.log('Error:', err.message));

fetchUserData(-1)
  .then(user  => console.log('User:', user.name))
  .catch(err  => console.log('Error:', err.message)); // Error: Invalid user ID


// ── 2. Using async/await
async function getUser(userId) {
  try {
    const user = await fetchUserData(userId);
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    return user;
  } catch (err) {
    console.log('Failed:', err.message);
  }
}

getUser(1);  // Name: Alice
getUser(-1); // Failed: Invalid user ID


// ── 3. Sequential vs Parallel execution
async function sequential() {
  console.time('sequential');
  const user1 = await fetchUserData(1); // waits 1 second
  const user2 = await fetchUserData(2); // waits 1 more second
  const user3 = await fetchUserData(3); // waits 1 more second
  console.timeEnd('sequential');        // ~3 seconds total
  return [user1, user2, user3];
}

async function parallel() {
  console.time('parallel');
  const [user1, user2, user3] = await Promise.all([
    fetchUserData(1), // all start at same time
    fetchUserData(2),
    fetchUserData(3),
  ]);
  console.timeEnd('parallel'); // ~1 second total
  return [user1, user2, user3];
}

sequential();
parallel();


// ── 4. Promise.allSettled — get all results even if some fail
async function getAllResults() {
  const results = await Promise.allSettled([
    fetchUserData(1),   // succeeds
    fetchUserData(-1),  // fails
    fetchUserData(2),   // succeeds
  ]);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Request ${index + 1}: SUCCESS —`, result.value.name);
    } else {
      console.log(`Request ${index + 1}: FAILED  —`, result.reason.message);
    }
  });
}

getAllResults();
// Request 1: SUCCESS — Alice
// Request 2: FAILED  — Invalid user ID
// Request 3: SUCCESS — Alice


// ── 5. Retry logic — very useful in automation
async function fetchWithRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}...`);
      const result = await fn();
      console.log('Success on attempt', attempt);
      return result;
    } catch (err) {
      console.log(`Attempt ${attempt} failed:`, err.message);
      if (attempt === maxRetries) {
        throw new Error(`All ${maxRetries} attempts failed`);
      }
      await new Promise(r => setTimeout(r, 1000)); // wait 1 sec before retry
    }
  }
}

fetchWithRetry(() => fetchUserData(1));
```

**Why it is asked:**
- Core concept in Playwright and Cypress
- Every async operation in testing uses Promises
- Retry logic is essential in automation frameworks

---

## 8. Sorting Algorithms

Sorting is asked to test logical thinking and understanding of how JavaScript sort works.

```javascript
// ── 1. Sort array of numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];

// Ascending
const ascending = [...numbers].sort((a, b) => a - b);
console.log('Ascending:', ascending);
// [11, 12, 22, 25, 34, 64, 90]

// Descending
const descending = [...numbers].sort((a, b) => b - a);
console.log('Descending:', descending);
// [90, 64, 34, 25, 22, 12, 11]


// ── 2. Sort array of strings
const fruits = ['banana', 'apple', 'mango', 'cherry', 'grape'];

const sortedFruits = [...fruits].sort();
console.log('Sorted fruits:', sortedFruits);
// ['apple', 'banana', 'cherry', 'grape', 'mango']

// Case-insensitive sort
const mixed = ['Banana', 'apple', 'Mango', 'cherry'];
const sortedMixed = [...mixed].sort((a, b) =>
  a.toLowerCase().localeCompare(b.toLowerCase())
);
console.log('Case insensitive:', sortedMixed);
// ['apple', 'Banana', 'cherry', 'Mango']


// ── 3. Sort array of objects
const employees = [
  { name: 'Charlie', age: 35, salary: 70000 },
  { name: 'Alice',   age: 28, salary: 55000 },
  { name: 'Bob',     age: 32, salary: 85000 },
  { name: 'Diana',   age: 25, salary: 62000 },
];

// Sort by name alphabetically
const byName = [...employees].sort((a, b) =>
  a.name.localeCompare(b.name)
);
console.log('By name:', byName.map(e => e.name));
// ['Alice', 'Bob', 'Charlie', 'Diana']

// Sort by age ascending
const byAge = [...employees].sort((a, b) => a.age - b.age);
console.log('By age:', byAge.map(e => `${e.name}(${e.age})`));
// ['Diana(25)', 'Alice(28)', 'Bob(32)', 'Charlie(35)']

// Sort by salary descending
const bySalary = [...employees].sort((a, b) => b.salary - a.salary);
console.log('By salary:', bySalary.map(e => `${e.name}(${e.salary})`));
// ['Bob(85000)', 'Charlie(70000)', 'Diana(62000)', 'Alice(55000)']


// ── 4. Bubble Sort — manual implementation (asked in interviews)
function bubbleSort(arr) {
  const result = [...arr];
  const n = result.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Swap
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  return result;
}

console.log('Bubble sort:', bubbleSort([64, 34, 25, 12, 22, 11, 90]));
// [11, 12, 22, 25, 34, 64, 90]
```

**Why it is asked:**
- Tests understanding of JavaScript sort behavior
- Sort on objects is very practical in test data management
- Bubble sort tests algorithmic thinking

---

## 9. String Manipulation — Most Common Operations

String manipulation is asked constantly in automation testing interviews for handling test data.

```javascript
// ── 1. Count occurrences of a character in a string
function countChar(str, char) {
  return str.split(char).length - 1;
}

console.log(countChar('automation testing', 'a')); // 2
console.log(countChar('hello world', 'l'));         // 3


// ── 2. Find the first non-repeating character
function firstNonRepeating(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      return str[i];
    }
  }
  return null;
}

console.log(firstNonRepeating('aabbcde')); // 'c'
console.log(firstNonRepeating('aabb'));    // null
console.log(firstNonRepeating('swiss'));   // 'w'


// ── 3. Count words in a string
function countWords(str) {
  return str.trim().split(/\s+/).length;
}

console.log(countWords('Hello World'));              // 2
console.log(countWords('Automation testing is fun')); // 4
console.log(countWords('  spaces   between  '));      // 2


// ── 4. Check if two strings are anagrams
function isAnagram(str1, str2) {
  const clean  = str => str.toLowerCase().replace(/\s/g, '').split('').sort().join('');
  return clean(str1) === clean(str2);
}

console.log(isAnagram('listen', 'silent'));    // true
console.log(isAnagram('hello',  'world'));     // false
console.log(isAnagram('Astronomer', 'Moon starer')); // true


// ── 5. Truncate a string
function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

console.log(truncate('Automation Testing Interview', 15)); // "Automation Test..."
console.log(truncate('Short', 10));                        // "Short"


// ── 6. Convert string to title case
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

console.log(toTitleCase('automation testing with playwright'));
// "Automation Testing With Playwright"


// ── 7. Remove all whitespace from a string
function removeWhitespace(str) {
  return str.replace(/\s/g, '');
}

console.log(removeWhitespace('Hello World Test')); // "HelloWorldTest"


// ── 8. Check if string contains only numbers
function isNumeric(str) {
  return /^\d+$/.test(str);
}

console.log(isNumeric('12345'));  // true
console.log(isNumeric('123a5'));  // false
console.log(isNumeric(''));       // false


// ── 9. Extract numbers from a string
function extractNumbers(str) {
  return str.match(/\d+/g)?.map(Number) || [];
}

console.log(extractNumbers('I have 3 cats and 2 dogs')); // [3, 2]
console.log(extractNumbers('Order #12345 — $99'));        // [12345, 99]


// ── 10. Capitalize first letter of each sentence
function capitalizeSentences(str) {
  return str.replace(/(^\s*\w|[.!?]\s*\w)/g, char => char.toUpperCase());
}

console.log(capitalizeSentences('hello world. how are you? i am fine.'));
// "Hello world. How are you? I am fine."
```

**Why it is asked:**
- String operations are used constantly in test data handling
- Tests regex knowledge
- Very practical for parsing API responses and UI text

---

## 10. Array Methods — map, filter, reduce, find, every, some

The most practical JavaScript code asked in automation interviews. You must know all array methods perfectly.

```javascript
const testResults = [
  { id: 1, testName: 'Login Test',       status: 'passed',  duration: 1200, module: 'Auth'    },
  { id: 2, testName: 'Signup Test',      status: 'failed',  duration: 3400, module: 'Auth'    },
  { id: 3, testName: 'Search Test',      status: 'passed',  duration: 800,  module: 'Search'  },
  { id: 4, testName: 'Checkout Test',    status: 'failed',  duration: 5200, module: 'Payment' },
  { id: 5, testName: 'Profile Test',     status: 'passed',  duration: 1500, module: 'User'    },
  { id: 6, testName: 'Payment Test',     status: 'passed',  duration: 2100, module: 'Payment' },
  { id: 7, testName: 'Logout Test',      status: 'passed',  duration: 600,  module: 'Auth'    },
  { id: 8, testName: 'Dashboard Test',   status: 'failed',  duration: 4100, module: 'UI'      },
];


// ── 1. map — transform each element
const testNames = testResults.map(test => test.testName);
console.log('All test names:', testNames);
// ['Login Test', 'Signup Test', 'Search Test', ...]

const durationInSeconds = testResults.map(test => ({
  name:     test.testName,
  duration: (test.duration / 1000).toFixed(2) + 's'
}));
console.log('Durations:', durationInSeconds);
// [{ name: 'Login Test', duration: '1.20s' }, ...]


// ── 2. filter — get elements matching a condition
const failedTests = testResults.filter(test => test.status === 'failed');
console.log('Failed tests:', failedTests.map(t => t.testName));
// ['Signup Test', 'Checkout Test', 'Dashboard Test']

const passedTests = testResults.filter(test => test.status === 'passed');
console.log('Passed tests count:', passedTests.length); // 5

const slowTests = testResults.filter(test => test.duration > 2000);
console.log('Slow tests:', slowTests.map(t => t.testName));
// ['Signup Test', 'Checkout Test', 'Payment Test', 'Dashboard Test']

const authTests = testResults.filter(test => test.module === 'Auth');
console.log('Auth tests:', authTests.map(t => t.testName));
// ['Login Test', 'Signup Test', 'Logout Test']


// ── 3. reduce — accumulate values into one result
const totalDuration = testResults.reduce((total, test) => {
  return total + test.duration;
}, 0);
console.log('Total duration:', totalDuration + 'ms'); // 18900ms

// Count tests by status
const statusCount = testResults.reduce((acc, test) => {
  acc[test.status] = (acc[test.status] || 0) + 1;
  return acc;
}, {});
console.log('Status count:', statusCount);
// { passed: 5, failed: 3 }

// Group tests by module
const byModule = testResults.reduce((acc, test) => {
  if (!acc[test.module]) acc[test.module] = [];
  acc[test.module].push(test.testName);
  return acc;
}, {});
console.log('Tests by module:', byModule);
// { Auth: ['Login Test', 'Signup Test', 'Logout Test'], ... }


// ── 4. find — get first matching element
const firstFailed = testResults.find(test => test.status === 'failed');
console.log('First failed test:', firstFailed.testName);
// 'Signup Test'

const checkoutTest = testResults.find(test => test.testName === 'Checkout Test');
console.log('Found test:', checkoutTest);
// { id: 4, testName: 'Checkout Test', status: 'failed', ... }


// ── 5. findIndex — get index of first matching element
const firstFailedIndex = testResults.findIndex(test => test.status === 'failed');
console.log('Index of first failed test:', firstFailedIndex); // 1


// ── 6. every — check if ALL elements match condition
const allPassed = testResults.every(test => test.status === 'passed');
console.log('All tests passed?', allPassed); // false

const allHaveName = testResults.every(test => test.testName.length > 0);
console.log('All have names?', allHaveName); // true


// ── 7. some — check if AT LEAST ONE element matches
const hasFailures = testResults.some(test => test.status === 'failed');
console.log('Has any failures?', hasFailures); // true

const hasCriticalSlowTest = testResults.some(test => test.duration > 5000);
console.log('Has test over 5s?', hasCriticalSlowTest); // true


// ── 8. Chaining multiple methods together
const result = testResults
  .filter(test => test.module === 'Auth')      // only Auth tests
  .filter(test => test.status === 'passed')    // only passed ones
  .map(test => test.testName)                  // get their names
  .sort();                                     // sort alphabetically

console.log('Passed Auth tests:', result);
// ['Login Test', 'Logout Test']


// ── 9. Calculate pass rate
const passRate = (
  testResults.filter(t => t.status === 'passed').length /
  testResults.length * 100
).toFixed(2);
console.log('Pass rate:', passRate + '%'); // 62.50%


// ── 10. Get average duration of failed tests
const failedAvgDuration = testResults
  .filter(t => t.status === 'failed')
  .reduce((sum, t, _, arr) => sum + t.duration / arr.length, 0)
  .toFixed(0);
console.log('Avg failed test duration:', failedAvgDuration + 'ms'); // 4233ms
```

**Why it is asked:**
- map, filter, reduce are the most used array methods in automation
- Processing test results and API responses requires these methods
- Shows your ability to write clean functional JavaScript
- Chaining methods shows advanced JavaScript knowledge

---

## Quick Reference — All 10 Codes

| # | Topic | Key Methods Used |
|---|-------|-----------------|
| 1 | Reverse a String | split, reverse, join, spread, reduce |
| 2 | Palindrome Check | toLowerCase, replace, reverse, two pointer |
| 3 | Find Duplicates | filter, indexOf, Set, reduce |
| 4 | Largest and Smallest | Math.max, Math.min, sort, reduce |
| 5 | Remove Duplicates | Set, filter, reduce, findIndex |
| 6 | Flatten Nested Array | flat, recursion, reduce, concat |
| 7 | Promises and Async/Await | Promise, async, await, Promise.all, retry |
| 8 | Sorting | sort, localeCompare, bubble sort, objects |
| 9 | String Manipulation | split, replace, regex, map, join |
| 10 | Array Methods | map, filter, reduce, find, every, some |

---

All 10 codes are complete and ready to use for your JavaScript automation testing interview preparation!