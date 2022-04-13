const expectedPayLoadObject = ({
                                   title, message, statusText, statusColour
                               }) => ({
    "type": "message", "attachments": [{
        "contentType": "application/vnd.microsoft.card.adaptive", "contentUrl": null, "content": {
            "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.2",
            "msteams": {"width": "Full"},
            "body": [{
                "isVisible": title !== '', "size": "large", "text": title, "type": "TextBlock",
            }, {
                "type": "RichTextBlock", "isVisible": statusText !== '', "inlines": [{
                    "type": "TextRun", "text": "Status: ", "wrap": true, "fontType": "monospace"
                }, {
                    "type": "TextRun",
                    "text": statusText,
                    "wrap": true,
                    "color": statusColour,
                    "weight": "bolder",
                    "fontType": "monospace"
                }]
            }, {
                "type": "ColumnSet", "columns": [{
                    "type": "Column",
                    "width": "stretch",
                    "style": "emphasis",
                    "items": [{"type": "TextBlock", "text": message, "wrap": true}]
                }, {
                    "type": "Column",
                    "width": "auto",
                    "verticalContentAlignment": "center",
                    "isVisible": false,
                    "items": [{"type": "ActionSet", "actions": []}, {"type": "ActionSet", "actions": []}]
                }]
            }]
        }
    }]
});

module.exports = expectedPayLoadObject;
