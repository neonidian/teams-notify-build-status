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
                                "isVisible": !!this.options?.jobStatus,
                                "inlines": [
                                    {
                                        "type": "TextRun",
                                        "text": 'Status: ',
                                        "wrap": true,
                                        "fontType": "monospace"
                                    },
                                    {
                                        "type": "TextRun",
                                        "text": this.options?.jobStatus,
                                        "wrap": true,
                                        "color": !!this.options?.jobStatus && this._statusColour(this.options?.jobStatus.trim()),
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
                                "isVisible": _environmentVariables.SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON || _environmentVariables.SHOULD_PUBLISH_VIEW_COMMIT_BUTTON,
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
                                                "isVisible": _environmentVariables.SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON,
                                                "actions": [
                                                    {
                                                        "type": "Action.OpenUrl",
                                                        "title": "View workflow",
                                                        "url": _environmentVariables.SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON && this._workFlowUrl()
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "ActionSet",
                                                "isVisible": _environmentVariables.SHOULD_PUBLISH_VIEW_COMMIT_BUTTON,
                                                "actions": [
                                                    {
                                                        "type": "Action.OpenUrl",
                                                        "title": "View commit",
                                                        "url": _environmentVariables.SHOULD_PUBLISH_VIEW_COMMIT_BUTTON && this._commitUrl()
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

    _workFlowUrl() {
        return `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;
    }

    _commitUrl() {
        return `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/commit/${GITHUB_SHA}`;
    }

    constructCard() {
        this._constructJson();
        return this._messageObject;
    }

    _statusColour(jobStatus) {
        if (jobStatus === "success") {
            return "good";
        } else if (jobStatus === "failure") {
            return "attention";
        } else if (jobStatus === "cancelled") {
            return "warning";
        } else if (jobStatus === "skipped") {
            return "accent";
        }
        return "default";
    }
}

const GITHUB_SERVER_URL = process.env.GITHUB_SERVER_URL;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const GITHUB_RUN_ID = process.env.GITHUB_RUN_ID;
const GITHUB_SHA = process.env.GITHUB_SHA;

module.exports = CustomizeCard;
