const CustomizeCard = require('../CustomizeCard');
const expectedPayLoad = require('./expectedPayLoadObject');

describe('Verify Customize card', () => {
    const GITHUB_SERVER_URL = "GITHUB_SERVER_URL";
    const GITHUB_REPOSITORY = "GITHUB_REPOSITORY";
    const GITHUB_RUN_ID = "GITHUB_RUN_ID";
    const GITHUB_SHA = "GITHUB_SHA";

    beforeEach(() => {
        delete process.env[GITHUB_SERVER_URL];
        delete process.env[GITHUB_REPOSITORY];
        delete process.env[GITHUB_RUN_ID];
        delete process.env[GITHUB_SHA];
    });

    test('Only message', () => {
        const message = 'Only message';
        const statusText = 'Success';
        const statusColour = 'good';
        const payload = new CustomizeCard(message, {status: statusText,}).constructCard();

        expect(payload).toMatchObject(expectedPayLoad({message, statusText, statusColour, }));
    });
});
