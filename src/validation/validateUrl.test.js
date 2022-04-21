const validateUrl = require('./validateUrl');

describe('Validate URL:', () => {
    test('Throws when not a valid webhook url', () => {
        expect(() => validateUrl('foo')).toThrow('Webhook url is not a valid url');
    });

    test('Does not throws when valid webhook url', () => {
        expect(() => validateUrl('https://foo')).not.toThrowError();
    });
});
