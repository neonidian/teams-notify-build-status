const postRequest = require('./post-request');

describe('Post a minimal message', () => {
    let _teamsIncomingHookUrl;

    beforeAll(() => {
        _teamsIncomingHookUrl = process.env.TEAMS_TEST_HOOK_URL;
        if(!_teamsIncomingHookUrl) {
            throw new Error('Teams webhook url not found in environment variable "TEAMS_TEST_HOOK_URL"');
        }
    });

    test('Send a string message', async () => {
        const messageToSend = 'Hello Teams!';
        let response = await postRequest(_teamsIncomingHookUrl, messageToSend);
        expect(response).toBe(200);
    });

    test('Send a boolean type message', async () => {
        const messageToSend = true;
        let response = await postRequest(_teamsIncomingHookUrl, messageToSend);
        expect(response).toBe(200);
    });

    test('Send a number type message', async () => {
        const messageToSend = 234.56;
        let response = await postRequest(_teamsIncomingHookUrl, messageToSend);
        expect(response).toBe(200);
    });
});

describe('Throws error', () => {
    test('Incorrect url', async () => {
        const messageToSend = 'some string';
        const siteName = 'some-invalid-urlll';
        await expect(postRequest(`https://${siteName}`, messageToSend)).rejects
            .toThrow('Error sending POST request to Teams \n' +
            ' Error: getaddrinfo ENOTFOUND ' + siteName);
    });
});
