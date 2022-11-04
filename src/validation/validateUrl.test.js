const validateUrl = require('./validateUrl');

describe('Validate URL:', () => {
    const invalidUrl = 'foo';

    test('Throws when not a valid webhook url', () => {
        expect(() => validateUrl([invalidUrl])).toThrow(`Webhook url: "${invalidUrl}" is not a valid url`);
    });

    test('Throws when 1 of the url is not a valid url', () => {
        expect(() => validateUrl(['https://foo.com', invalidUrl,])).toThrow(`Webhook url: "${invalidUrl}" is not a valid url`);
    });

    test('Does not throws when valid webhook url', () => {
        expect(() => validateUrl(['https://foo'])).not.toThrowError();
    });

    test('Does not throws when 2 valid webhook url', () => {
        expect(() => validateUrl(['https://foo'])).not.toThrowError();
    });
});
