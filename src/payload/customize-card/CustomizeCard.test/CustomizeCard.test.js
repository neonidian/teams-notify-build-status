const CustomizeCard = require('../CustomizeCard');
const expectedPayLoad = require('./expectedPayLoadObject');

describe('Verify JSON payload', () => {

    test('Only message', () => {
        const message = 'Only message';

        const payload = new CustomizeCard(message, { status: '', title: '', }).constructCard();

        expect(payload).toMatchObject(expectedPayLoad({message, statusText: '', title: '', statusColour: 'default',}));
    });

    test('Message with status success', () => {
        const message = 'Message with success status';
        const statusText = 'Success';
        const statusColour = 'good';
        const title = 'Success message';
        const payload = new CustomizeCard(message, {status: statusText, title, }).constructCard();

        expect(payload).toMatchObject(expectedPayLoad({message, statusText, statusColour, title}));
    });

    test('Message with custom status', () => {
        const message = 'Message with custom status';
        const statusText = 'Custom status';
        const statusColour = 'default';
        const title = '';
        const payload = new CustomizeCard(message, {status: statusText,title,}).constructCard();

        expect(payload).toMatchObject(expectedPayLoad({message, statusText, statusColour,title,}));
    });

    describe('With env variables', () => {
        const GITHUB_SERVER_URL = "GITHUB_SERVER_URL";
        const GITHUB_REPOSITORY = "GITHUB_REPOSITORY";
        const GITHUB_RUN_ID = "GITHUB_RUN_ID";
        const GITHUB_SHA = "GITHUB_SHA";
        const SHOULD_DISPLAY_VIEW_RUN_BUTTON = "SHOULD_DISPLAY_VIEW_RUN_BUTTON";

        const githubServerUrl = 'https://foo';
        const githubRepository = 'notify';
        const githubRunId = 1234;

        beforeEach(() => {
            delete process.env[GITHUB_SERVER_URL];
            delete process.env[GITHUB_REPOSITORY];
            delete process.env[GITHUB_RUN_ID];
            delete process.env[GITHUB_SHA];
        });

        test('Payload should not have run URL when view run env variable is set to false', () => {
            process.env = Object.assign(process.env, {
                [GITHUB_SERVER_URL]: githubServerUrl, [GITHUB_REPOSITORY]: githubRepository, [GITHUB_RUN_ID]: githubRunId,
                [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'false'
            });
            const message = 'Message with cancelled status';
            const statusText = 'Cancelled';
            const statusColour = 'warning';
            const title = '';
            const payload = new CustomizeCard(message, {status: statusText,title,}).constructCard();

            expect(payload).toMatchObject(expectedPayLoad({message, statusText, statusColour,title,}));
        });
    });
});
