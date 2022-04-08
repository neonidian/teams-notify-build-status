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
                        "msteams": {
                            "width": "Full"
                        },
                        "body": [
                            {
                                "type": "RichTextBlock",
                                "isVisible": !!this.options?.jobStatus?.trim(),
                                "inlines": [
                                    {
                                        "type": "TextRun",
                                        "text": 'Status: ',
                                        "wrap": true,
                                        "fontType": "monospace"
                                    },
                                    {
                                        "type": "TextRun",
                                        "text": this.options?.jobStatus?.trim(),
                                        "wrap": true,
                                        "color": "good",
                                        "weight": "bolder",
                                        "fontType": "monospace"
                                    }
                                ]
                            },
                            {
                                "type": "Container",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": this.message,
                                        "wrap": true,
                                    },
                                ],
                            },
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                    },
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "items": [
                                            {
                                                "type": "ActionSet",
                                                "actions": [
                                                    {
                                                        "type": "Action.ShowCard",
                                                        "title": "View workflow",
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
