let monthname = "Jan";

// switch comes only when equality is there 
// switch keep executing all cases until it is not getting break

switch(monthname){
    
    case "Jan":
        console.log(1);
        

    case "Feb":
    case "FEB":
        console.log(2);
        break;

    case "Mar":
        console.log(3);
        break;
    default:
        console.log(9)

}