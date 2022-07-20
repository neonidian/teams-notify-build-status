const main = require('../../src/main');

describe('Post message with job status', () => {
    const _teamsIncomingHookUrl = process.env.TEAMS_TEST_HOOK_URL;
    const responseBody = 1;
    const SHOULD_DISPLAY_VIEW_COMMIT_BUTTON = "SHOULD_DISPLAY_VIEW_COMMIT_BUTTON";
    const SHOULD_DISPLAY_VIEW_RUN_BUTTON = "SHOULD_DISPLAY_VIEW_RUN_BUTTON";
    const SHOULD_DISPLAY_ACTOR_LABEL = "SHOULD_DISPLAY_ACTOR_LABEL";
    const options = {
        status: 'success',
    };

    beforeAll(() => {
        if(!_teamsIncomingHookUrl) {
            throw new Error('Teams webhook url not found in environment variable "TEAMS_TEST_HOOK_URL"');
        }
    });

    beforeEach(() => {
        delete process.env[SHOULD_DISPLAY_VIEW_COMMIT_BUTTON];
        delete process.env[SHOULD_DISPLAY_VIEW_RUN_BUTTON];
        delete process.env[SHOULD_DISPLAY_ACTOR_LABEL];
    });

    test('Send a message with status and no actor', async () => {
        const messageToSend = 'Short message with status and no actor';
        let response = await main(_teamsIncomingHookUrl, messageToSend, options);
        expect(response).toBe(responseBody);
    });

    test('Send a message with status and actor', async () => {
        process.env = Object.assign(process.env, {
            [SHOULD_DISPLAY_ACTOR_LABEL]: 'true',
        });
        const messageToSend = 'message with status and actor (To display actor name env var GITHUB_ACTOR needs to be set)';
        let response = await main(_teamsIncomingHookUrl, messageToSend, options);
        expect(response).toBe(responseBody);
    });


    test('Send a message with only actor and no status', async () => {
        process.env = Object.assign(process.env, {
            [SHOULD_DISPLAY_ACTOR_LABEL]: 'true',
        });
        const messageToSend = 'Message with only actor (To display actor name env var GITHUB_ACTOR needs to be set)';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {});
        expect(response).toBe(responseBody);
    });

    test('Explicitly disable actor', async () => {
        process.env = Object.assign(process.env, {
            [SHOULD_DISPLAY_ACTOR_LABEL]: 'false',
        });
        const messageToSend = 'Explicitly disable actor and pass no status. So no actor or status should be displayed';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {});
        expect(response).toBe(responseBody);
    });

    test('Send a long message with status', async () => {
        const messageToSend = 'Long message with success status(green text). With status message published SDK version of container 0.1.1 (major) version. Pushed the container to docker registry and artifactory';
        let response = await main(_teamsIncomingHookUrl, messageToSend, options);
        expect(response).toBe(responseBody);
    });

    test('Send a message with status- "failure"', async () => {
        const messageToSend = 'Message with failure status (red text)';
        const option = {
            status: 'failure',
        };
        let response = await main(_teamsIncomingHookUrl, messageToSend, option);
        expect(response).toBe(responseBody);
    });

    test('Send a message with status- "cancelled"', async () => {
        const messageToSend = 'Message with cancelled status (orange text)';
        const option = {
            status: 'cancelled',
        };
        let response = await main(_teamsIncomingHookUrl, messageToSend, option);
        expect(response).toBe(responseBody);
    });

    test('Send a message with status- "skipped"', async () => {
        const messageToSend = 'Message with skipped status (violet colour text)';
        const option = {
            status: 'skipped',
        };
        let response = await main(_teamsIncomingHookUrl, messageToSend, option);
        expect(response).toBe(responseBody);
    });

    test('Send a message with status- "BUILD SUCCESSFUL"', async () => {
        const messageToSend = 'Message with ""BUILD SUCCESSFUL" status (default colour text)';
        const option = {
            status: 'BUILD SUCCESSFUL',
        };
        let response = await main(_teamsIncomingHookUrl, messageToSend, option);
        expect(response).toBe(responseBody);
    });

    test('Send a long message with no status', async () => {
        const messageToSend = 'Long message with no status. With label message published SDK version of container 0.1.1 (major) version. Pushed the container to docker registry and artifactory';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {status: ''});
        expect(response).toBe(responseBody);
    });

    test('Send a short message with no status', async () => {
        const messageToSend = 'Short message with no status';
        let response = await main(_teamsIncomingHookUrl, messageToSend, {status: ''});
        expect(response).toBe(responseBody);
    });
});
