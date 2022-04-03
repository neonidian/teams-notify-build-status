const main = require('./main');

describe('Main:', () => {
    test('Throws when not a valid webhook url', async () => {
        await expect(main('foo', '')).rejects.toThrow('Webhook url is not a valid url');
    });
});
