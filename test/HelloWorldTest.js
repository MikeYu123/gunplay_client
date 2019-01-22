'use strict';

import HelloWorld from '../src/assets/js/core/Game.js';

describe('HelloWorld test', () => {
    it('should return greetings', () => {
        let helloWorld = new HelloWorld('test');
        let greetings = helloWorld.sayHello();
        expect(greetings).toEqual('test');
    });
});
