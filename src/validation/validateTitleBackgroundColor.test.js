const validateTitleBackgroundColor = require('./validateTitleBackgroundColor');

describe('Validate Title Background color:', () => {
    const supportedColors = [
        'success', 'green',
        'failure', 'red',
        'cancelled', 'yellow',
        'skipped', 'blue',
    ];

    function titleBgValidationErrorText(invalidColor) {
        return `Color: "${invalidColor}" is not supported. Allowed values: "${supportedColors.join('", "')}"`;
    }

    test('Throws when not a valid title background color - foo', () => {
        const invalidColor = 'foo';
        expect(() => validateTitleBackgroundColor(invalidColor)).toThrow(titleBgValidationErrorText(invalidColor));
    });

    test('Throws when not a valid title background color - purple', () => {
        const invalidColor = 'purple';
        expect(() => validateTitleBackgroundColor(invalidColor)).toThrow(titleBgValidationErrorText(invalidColor));
    });

    test('Does not throws for valid colour - success', () => {
        const validColor = 'success';
        expect(() => validateTitleBackgroundColor(validColor)).not.toThrowError();
    });

    test('Does not throws for valid colour - red', () => {
        const validColor = 'red';
        expect(() => validateTitleBackgroundColor(validColor)).not.toThrowError();
    });
});
