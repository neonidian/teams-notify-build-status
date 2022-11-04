const main = require('./main');

describe('Main:', () => {
    const supportedColors = [
        'success', 'green',
        'failure', 'red',
        'cancelled', 'yellow',
        'skipped', 'blue',
    ];

    test('Throws when not a valid webhook url', async () => {
        const webhookUrlInput = 'foo';
        await expect(main(webhookUrlInput, '', { status: '' })).rejects.toThrow(`Webhook url: "${webhookUrlInput}" is not a valid url`);
    });

    test('Throws when one of the url is not a valid webhook url seperated by new line', async () => {
        const webhookUrlInput = 'https://valid-url.se';
        const webhookUrlInput2 = 'foo';
        await expect(main(`${webhookUrlInput}
        ${webhookUrlInput2}`, '', { status: '' })).rejects.toThrow(`Webhook url: "${webhookUrlInput2}" is not a valid url`);
    });

    test('Throws when one of the url is not a valid webhook url seperated by space', async () => {
        const webhookUrlInput = 'https://valid-url.se';
        const webhookUrlInput2 = 'foo';
        await expect(main(`${webhookUrlInput} ${webhookUrlInput2}`, '', { status: '' })).rejects.toThrow(`Webhook url: "${webhookUrlInput2}" is not a valid url`);
    });

    function titleBgValidationErrorText(invalidColor) {
        return `Color: "${invalidColor}" is not supported. Allowed values: "${supportedColors.join('", "')}"`;
    }

    test('Throws when not a valid title background color - foo', async () => {
        const invalidColor = 'foo';
        await expect(main('https://foo.com', '', { titleBackgroundColor: invalidColor })).rejects
            .toThrow(titleBgValidationErrorText(invalidColor));
    });

    test('Throws when not a valid title background color - purple', async () => {
        const invalidColor = 'purple';
        await expect(main('https://foo.com', '', { titleBackgroundColor: invalidColor })).rejects
            .toThrow(titleBgValidationErrorText(invalidColor));
    });
});
