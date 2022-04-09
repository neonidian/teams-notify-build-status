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
                                "isVisible": !!this.options?.status,
                                "inlines": [
                                    {
                                        "type": "TextRun",
                                        "text": 'Status: ',
                                        "wrap": true,
                                        "fontType": "monospace"
                                    },
                                    {
                                        "type": "TextRun",
                                        "text": this.options?.status,
                                        "wrap": true,
                                        "color": !!this.options?.status && this._statusColour(this.options?.status),
                                        "weight": "bolder",
                                        "fontType": "monospace"
                                    }
                                ]
                            },
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "style": "emphasis",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": this.message,
                                                "wrap": true,
                                            },
                                        ],
                                    },
                                    {
                                        "type": "Column",
                                        "width": "auto",
                                        "verticalContentAlignment": "center",
                                        "isVisible": _environmentVariables.SHOULD_DISPLAY_VIEW_RUN_BUTTON || _environmentVariables.SHOULD_DISPLAY_VIEW_COMMIT_BUTTON,
                                        "items": [
                                            {
                                                "type": "ActionSet",
                                                "actions": this._constructActionsArray(_environmentVariables.SHOULD_DISPLAY_VIEW_RUN_BUTTON, "View run", this._runUrl())
                                            },
                                            {
                                                "type": "ActionSet",
                                                "actions": this._constructActionsArray(_environmentVariables.SHOULD_DISPLAY_VIEW_COMMIT_BUTTON, "View commit", this._commitUrl())
                                            },
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

    _runUrl() {
        return `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;
    }

    _commitUrl() {
        return `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/commit/${GITHUB_SHA}`;
    }

    constructCard() {
        this._constructJson();
        return this._messageObject;
    }

    _statusColour(jobOrStepStatus) {
        const status = jobOrStepStatus?.trim().toLowerCase();
        if (status === "success") {
            return "good";
        } else if (status === "failure") {
            return "attention";
        } else if (status === "cancelled") {
            return "warning";
        } else if (status === "skipped") {
            return "accent";
        }
        return "default";
    }

    _constructActionsArray(envVarOfButton, buttonText, buttonUrl) {
        const actionsArray = [];
        const action = {
                "type": "Action.OpenUrl",
                "title": buttonText,
                "url": buttonUrl
        };
        if (envVarOfButton) {
            actionsArray.push(action);
        }
        return actionsArray;
    }
}

const GITHUB_SERVER_URL = process.env.GITHUB_SERVER_URL;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const GITHUB_RUN_ID = process.env.GITHUB_RUN_ID;
const GITHUB_SHA = process.env.GITHUB_SHA;

module.exports = CustomizeCard;
