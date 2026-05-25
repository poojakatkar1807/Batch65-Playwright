
export class Navigate{

   constructor(page){
          this.page = page;
    }

    async openApp(){
        await this.page.goto('https://www.saucedemo.com/');
    }



}