const main = require('./main');

describe('Main:', () => {
    const supportedColors = [
        'success', 'green',
        'failure', 'red',
        'cancelled', 'yellow',
        'skipped', 'blue',
    ];

    test('Throws when not a valid webhook url', async () => {
        await expect(main('foo', '', { status: '' })).rejects.toThrow('Webhook url is not a valid url');
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
