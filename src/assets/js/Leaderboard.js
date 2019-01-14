 export default class Leaderboard{
    constructor({host}){
        this.host = host || window.document.documentElement;
        this.render()
    }

    render() {
        this.el = document.createElement('div');
        this.table = document.createElement('table');

        this.el.className = 'leaderboard';

        this.host.appendChild( this.el );
        this.el.appendChild(this.table)

        //TODO: move to style files this shit

    }

    update( data ) {
        this.clean();

        data
            .sort( (a, b) => a - b )
            .forEach( ({id, name, kills, deaths}, idx) => {
                let additionalSymb = idx === 0 ? '👑' : '';
                this.table.innerHTML += `<tr class="${id}">
                    <td class="name">${additionalSymb}${name}</td>
                    <td>${kills}</td>
                    <td>${deaths}</td>
                </tr>`;
            });
    }

    clean() {
        this.table.innerHTML = ''
    }
 }