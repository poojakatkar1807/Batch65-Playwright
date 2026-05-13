

/*  fuction click(elememt){   
       setTimeout(()=> {
             console.log(element + "clicked")
        }, 1000)
}  
        */


function click(element){

    let p1 = new Promise((resolve, reject)=>{

        setTimeout(()=> {

        console.log(element + " clicked ");

        resolve();

    }, 1000);

    });

    return p1;

}

function type(element){

    let p1 = new Promise((resolve, reject)=>{

        setTimeout(()=> {

        console.log(element + " type ");

        //(element + " type not worked so rejecting.");
        resolve()

    }, 500);

    });

    return p1;

}

 

function doubleclick(element){

    let p1 = new Promise((resolve, reject)=>{

        setTimeout(()=> {

        console.log(element + " double click ");

        resolve();

    }, 3000);

    });

    return p1;

}

 

/*click("Login link").then(() =>{

    return type("username ")

}).then(() => {

    return type("password")

}).then(() => {

    return doubleclick("login button")

}).then(() => {

    return click("logout");

}).catch((err)=>{

    console.log(err);

})*/

async function test1 (){
    await click("Login link")
    await type("username ")
    await type("password")
    await doubleclick("login button")
    await click("logout")
}
test1();

// await - promise ke resolev/reject ka wait 
// for await promise return mandate
// fuction should be async  