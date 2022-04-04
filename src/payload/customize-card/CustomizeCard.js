const envs = require('./envs');

class CustomizeCard {

    constructor(message, options) {
        this.message = message;
        this.options = options;
    }

    initialize() {
        this._environmentVariables = envs();
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
                                ],
                            },
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "items": [
                                            {
                                                "type": "RichTextBlock",
                                                "isVisible": !!this.options?.jobStatus?.trim(),
                                                "inlines": [
                                                    "Status: ",
                                                    {
                                                        "type": "TextRun",
                                                        "text": this.options?.jobStatus?.trim(),
                                                        "wrap": true,
                                                        "color": "good",
                                                        "weight": "bolder",
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "items": [
                                            {
                                                "type": "ActionSet",
                                                "actions": [
                                                    {
                                                        "type": "Action.ShowCard",
                                                        "title": "Action.ShowCard",
                                                        "card": {
                                                            "type": "AdaptiveCard",
                                                            "body": [
                                                                {
                                                                    "type": "TextBlock",
                                                                    "text": "What do you think?"
                                                                }
                                                            ],
                                                            "actions": [
                                                                {
                                                                    "type": "Action.Submit",
                                                                    "title": "Neat!"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
        };
    }

    constructJson() {
        this.initialize();
        return this._messageObject;
    }
}

module.exports = CustomizeCard;
