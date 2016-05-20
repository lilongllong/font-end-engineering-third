class Application{
    constructor(name,type){
        this.name =  name;
        this.type =  type;
    }
    display(){
        console.log(`app name is ${this.name} and the type is ${this.type}`);
    }
}

const app = new Application("document", "web test");
app.display();

( () => {
    $(".indexjs").css({
        background: "green",
        color: "#7687b8"
    });
})();
