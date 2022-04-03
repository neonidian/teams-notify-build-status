const postRequest = require('./post-request')

describe('Post a minimal message in teams', () => {
    let _teamsIncomingHookUrl;
    beforeAll(() => {
        _teamsIncomingHookUrl = process.env.TEAMS_TEST_HOOK_URL;
        if(!_teamsIncomingHookUrl) {
            throw new Error('Teams webhook url not found in environment variable "TEAMS_TEST_HOOK_URL"')
        }
    })

    test('Send only a message', async () => {
        const messageToSend = 'Hello Teams!';
        let response = await postRequest(_teamsIncomingHookUrl, messageToSend);
        expect(response).toBe(200);
    });
});
