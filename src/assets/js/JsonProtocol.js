export default class JsonProtocol {
    constructor() {
        this.encode = (message) => {return {data: JSON.stringify(message), isBinary: false} }
        this.decode = (data) => JSON.parse(data);
    }
}