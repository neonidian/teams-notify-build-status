const envs = require('./envs');

class CustomizeCard {

    constructor(message, options) {
        this.message = message;
        this.options = options;
    }

    constructJson() {
        this._messageObject = {};
        this.environmentVariables = envs();
        return this._messageObject;
    }
}

module.exports = CustomizeCard;
