const main = require('../../src/main');

describe('Post message with job status', () => {
    let _teamsIncomingHookUrl;
    const onlyJobStatusOption = {
        jobStatus: 'success',
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

    test('Send a message with status', async () => {
        const messageToSend = 'With label message';
        let response = await main(_teamsIncomingHookUrl, messageToSend, onlyJobStatusOption);
        expect(response).toBe(200);
    });
});
