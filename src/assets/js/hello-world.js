import pixi from 'pixi'
export default class HelloWorld {
    constructor (greetings) {
        this.greetings = greetings;
    }

    sayHello() {
        console.log(pixi);
        return this.greetings;
    }
}
