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
                                "type": "Container",
                                "style": "default",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": this.message,
                                        "wrap": true,
                                        "size": "large"
                                    },
                                    {
                                        "type": "RichTextBlock",
                                        "isVisible": !!this.options?.jobStatus,
                                        "inlines": [
                                            "Status: ",
                                            {
                                                "type": "TextRun",
                                                "text": this.options?.jobStatus,
                                                "wrap": true,
                                                "color": "good",
                                                "weight": "bolder",

                                            }
                                        ]
                                    },
                                ]
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
