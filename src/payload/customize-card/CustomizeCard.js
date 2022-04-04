const envs = require('./envs');

class CustomizeCard {

    constructor(message, options) {
        this.message = message;
        this.options = options;
    }

    initialize() {
        this._messageObject = {
            "type": "message",
            "attachments": [
                {
                    "contentType": "application/vnd.microsoft.card.adaptive",
                    "contentUrl": null,
                    "content": {
                        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                        "type": "AdaptiveCard",
                        "version": "1.2",
                        "body": [
                            {
                                "type": "TextBlock",
                                "text": "For Samples and Templates, see [https://adaptivecards.io/samples](https://adaptivecards.io/samples)"
                            }
                        ]
                    }
                }
            ]
        };
        this.environmentVariables = envs();
    }

    constructJson() {
        this.initialize();
        return this._messageObject;
    }
}

module.exports = CustomizeCard;
