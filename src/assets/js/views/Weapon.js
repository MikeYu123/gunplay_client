export default class Weapon {
    constructor({host}){
        this.host = host || window.document.documentElement;
        this.render = () => {
            this.el = document.createElement('div');
            Object.assign(this.el.style, {width: '200px'});
            this.el.className = 'weaponry';

            this.host.appendChild( this.el );
        };

        const clean = () => {
            this.el.innerHTML = ''
        };

        this.update = data => {
            clean();
            this.el.innerHTML += `<h2>${data.weapon}</h2>`;
            if(data.weapon !== 'unarmed')
                this.el.innerHTML += `<p>${data.ammo} rounds</p>`

        };

        this.render()
    }

}