const envs = require('./envs');

class CustomizeCard {

    constructor(message, options) {
        this.message = message;
        this.options = options;
    }

    _constructJson() {
        const _environmentVariables = envs();
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
                                "isVisible": _environmentVariables.SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON,
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
                                                        "type": "Action.OpenUrl",
                                                        "title": "View workflow",
                                                        "url": "https://google.com"
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

    constructCard() {
        this._constructJson();
        return this._messageObject;
    }
}

module.exports = CustomizeCard;
