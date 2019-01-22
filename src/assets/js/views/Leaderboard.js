 export default class Leaderboard{
    constructor({host}){
        this.host = host || window.document.documentElement;
        this.render()
    }

    render() {
        this.el = document.createElement('div');
        this.table = document.createElement('table');
        Object.assign(this.el.style, {width: '200px'});
        Object.assign(this.table.style, {width: '200px'});

        this.el.className = 'leaderboard';

        this.host.appendChild( this.el );
        this.el.appendChild(this.table)

        //TODO: move to style files this shit

    }

    update( data ) {
        this.clean();
        this.table.innerHTML += "<theader><tr>" +
            "<th>Name</th>" +
            "<th>Kills</th> " +
            "<th>Deaths</th> " +
            "</tr></theader>"
        this.table.innerHTML += '<tbody>'
        data
            .sort( (a, b) => a - b )
            .forEach( ({id, name, kills, deaths}) => {
                this.table.innerHTML += `<tr class="${id}">
                    <td class="name">${name}</td>
                    <td >${kills}</td>
                    <td >${deaths}</td>
                </tr>`;
            });
        this.table.innerHTML += '</tbody>'

    }

    clean() {
        this.table.innerHTML = ''
    }
 }