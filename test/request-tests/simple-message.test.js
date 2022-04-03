const main = require('../../src/main');

describe('Post message', () => {
    let _teamsIncomingHookUrl;
    const emptyOptions = {
        jobStatus: '',
        githubToken: '',
        successCardColour: '',
        failureCardColour: '',
        cancelledCardColour: '',
    };

    beforeAll(() => {
        _teamsIncomingHookUrl = process.env.TEAMS_TEST_HOOK_URL;
        if(!_teamsIncomingHookUrl) {
            throw new Error('Teams webhook url not found in environment variable "TEAMS_TEST_HOOK_URL"');
        }
    });

    test('Send a string message', async () => {
        const messageToSend = 'Hello Teams!';
        let response = await main(_teamsIncomingHookUrl, messageToSend, emptyOptions);
        expect(response).toBe(200);
    });

    test('Send a boolean type message', async () => {
        const messageToSend = true;
        let response = await main(_teamsIncomingHookUrl, messageToSend, emptyOptions);
        expect(response).toBe(200);
    });

    test('Send a number type message', async () => {
        const messageToSend = 234.56;
        let response = await main(_teamsIncomingHookUrl, messageToSend, emptyOptions);
        expect(response).toBe(200);
    });
});
