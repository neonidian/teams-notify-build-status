const expectedPayLoadObject = ({
                                   title, titleBackgroundColour, message, statusText, statusColour
                               }) => ({
    "type": "message", "attachments": [{
        "contentType": "application/vnd.microsoft.card.adaptive", "contentUrl": null, "content": {
            "$schema": "https://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.2",
            "msteams": {"width": "Full"},
            "body": [
                {
                    "type": "Container",
                    "bleed": true,
                    "isVisible": !!titleBackgroundColour || !!title,
                    // "style": !!titleBackgroundColour && 'default', TODO: add tests for title BG colour
                    "items": [
                        {
                            "type": "TextBlock",
                            "isVisible": !!title,
                            "text": title,
                            "size": "large",
                            "style": "heading",
                            "wrap": true,
                        }
                    ],
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
