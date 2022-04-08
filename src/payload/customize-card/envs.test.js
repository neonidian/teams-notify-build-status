const envs = require('./envs');

describe('Environment variables', () => {
    const SHOULD_PUBLISH_VIEW_COMMIT_BUTTON = "SHOULD_PUBLISH_VIEW_COMMIT_BUTTON";
    const SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON = "SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON";

    beforeEach(() => {
        delete process.env[SHOULD_PUBLISH_VIEW_COMMIT_BUTTON];
        delete process.env[SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON];
    });

    test('Send no env variable', () => {
        let response = envs();
        expect(response).toMatchObject({
            [SHOULD_PUBLISH_VIEW_COMMIT_BUTTON]: false,
            [SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON]: false,
        });
    });

    test('Set both env variable to "true"', () => {
        process.env = Object.assign(process.env, { [SHOULD_PUBLISH_VIEW_COMMIT_BUTTON]: 'true', [SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON]: 'true' });
        let response = envs();
        expect(response).toMatchObject({
            [SHOULD_PUBLISH_VIEW_COMMIT_BUTTON]: true,
            [SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON]: true,
        });
    });

    test('Set both env variable to "false"', () => {
        process.env = Object.assign(process.env, { [SHOULD_PUBLISH_VIEW_COMMIT_BUTTON]: 'false', [SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON]: 'false'  });
        let response = envs();
        expect(response).toMatchObject({
            [SHOULD_PUBLISH_VIEW_COMMIT_BUTTON]: false,
            [SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON]: false,
        });
    });

    test('Set one env variable to "false" and other to "true"', () => {
        process.env = Object.assign(process.env, { [SHOULD_PUBLISH_VIEW_COMMIT_BUTTON]: 'false', [SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON]: 'true'  });
        let response = envs();
        expect(response).toMatchObject({
            [SHOULD_PUBLISH_VIEW_COMMIT_BUTTON]: false,
            [SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON]: true,
        });
    });

    test('Set one env variable to "true" and do not pass the other value', () => {
        process.env = Object.assign(process.env, { [SHOULD_PUBLISH_VIEW_COMMIT_BUTTON]: 'true',  });
        let response = envs();
        expect(response).toMatchObject({
            [SHOULD_PUBLISH_VIEW_COMMIT_BUTTON]: true,
            [SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON]: false,
        });
    });

    test('Should throw error for values other than true or false strings', () => {
        const envValue = 'falsee';
        process.env = Object.assign(process.env, { [SHOULD_PUBLISH_VIEW_COMMIT_BUTTON]: envValue });
        try {
            envs();
        } catch (error) {
            expect(error.message).toBe(`Environment variable: "SHOULD_PUBLISH_VIEW_COMMIT_BUTTON" has the value "${envValue}". Allowed values - "true" or "false"`);
        }
    });

    test('Should throw error for number types', () => {
        const envValue = 41;
        process.env = Object.assign(process.env, { [SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON]: envValue });
        try {
            envs();
        } catch (error) {
            expect(error.message).toBe(`Environment variable: "SHOULD_PUBLISH_VIEW_WORKFLOW_BUTTON" has the value "${envValue}". Allowed values - "true" or "false"`);
        }
    });
});
