
class human{
 
    constructor(name1, age1){
        this.name= name1
        this.age= age1
    }

    printMyInfo()
    {
        console.log(this.name , this.age)
    }
  happyBirthday(){
         
    this.age++;
  }
}

// let h1 = new human()
// h1.age= 43
// h1.name = "Pooja"
// h1.printMyInfo();

let h1 = new human("Radha", 25) // initialization using constructor
h1.printMyInfo();
h1.happyBirthday();
h1.printMyInfo();

// Page object model
