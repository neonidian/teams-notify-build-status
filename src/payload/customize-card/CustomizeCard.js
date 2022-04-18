const envs = require('./envs');

class CustomizeCard {
    constructor(message, {
        status,
        title,
    }) {
        this.message = message;
        this.status = status;
        this.title = title;
    }

    _constructJson() {
        const _environmentVariables = envs();
        const {
            SHOULD_DISPLAY_VIEW_RUN_BUTTON,
            SHOULD_DISPLAY_VIEW_COMMIT_BUTTON,
        } = _environmentVariables;
        this._messageObject = {
            "type": "message",
            "attachments": [
                {
                    "contentType": "application/vnd.microsoft.card.adaptive",
                    "contentUrl": null,
                    "content": {
                        "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
                        "type": "AdaptiveCard",
                        "version": "1.2",
                        "msteams": {
                            "width": "Full"
                        },
                        "body": [
                            {
                                "type": "TextBlock",
                                "isVisible": this.title !== '',
                                "text": this.title,
                                "size": "large",
                                "style": "heading",
                            },
                            {
                                "type": "RichTextBlock",
                                "isVisible": this.status !== '',
                                "inlines": [
                                    {
                                        "type": "TextRun",
                                        "text": 'Status: ',
                                        "wrap": true,
                                        "fontType": "monospace"
                                    },
                                    {
                                        "type": "TextRun",
                                        "text": this.status ?? '',
                                        "wrap": true,
                                        "color": this._statusColour(this.status),
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
                                        "isVisible": SHOULD_DISPLAY_VIEW_RUN_BUTTON || SHOULD_DISPLAY_VIEW_COMMIT_BUTTON,
                                        "items": [
                                            {
                                                "type": "ActionSet",
                                                "actions": this._constructActionsArray(SHOULD_DISPLAY_VIEW_RUN_BUTTON, "View run", this._runUrl())
                                            },
                                            {
                                                "type": "ActionSet",
                                                "actions": this._constructActionsArray(SHOULD_DISPLAY_VIEW_COMMIT_BUTTON, "View commit", this._commitUrl())
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
        if (!jobOrStepStatus) {
            return "default";
        }
        const status = jobOrStepStatus?.toLowerCase();
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
        if (envVarOfButton) {
            actionsArray.push({
                "type": "Action.OpenUrl",
                "title": buttonText,
                "url": buttonUrl
            });
        }
        return actionsArray;
    }
}

const {
    GITHUB_SERVER_URL,
    GITHUB_REPOSITORY,
    GITHUB_RUN_ID,
    GITHUB_SHA,
} = process.env;

module.exports = CustomizeCard;
