const envs = require('./envs');

describe('Environment variables', () => {
    const SHOULD_DISPLAY_VIEW_COMMIT_BUTTON = "SHOULD_DISPLAY_VIEW_COMMIT_BUTTON";
    const SHOULD_DISPLAY_VIEW_RUN_BUTTON = "SHOULD_DISPLAY_VIEW_RUN_BUTTON";
    const SHOULD_DISPLAY_ACTOR_LABEL = "SHOULD_DISPLAY_ACTOR_LABEL";

    beforeEach(() => {
        delete process.env[SHOULD_DISPLAY_VIEW_COMMIT_BUTTON];
        delete process.env[SHOULD_DISPLAY_VIEW_RUN_BUTTON];
        delete process.env[SHOULD_DISPLAY_ACTOR_LABEL];
    });

    test('Send no env variable', () => {
        let response = envs();
        expect(response).toMatchObject({
            [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: false,
            [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: false,
            [SHOULD_DISPLAY_ACTOR_LABEL]: false,
        });
    });

    test('Set all env variable to "true"', () => {
        process.env = Object.assign(process.env, {
            [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'true',
            [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true',
            [SHOULD_DISPLAY_ACTOR_LABEL]: 'true',
        });
        let response = envs();
        expect(response).toMatchObject({
            [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: true,
            [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: true,
            [SHOULD_DISPLAY_ACTOR_LABEL]: true,
        });
    });

    test('Set view commit and view run buttons env variable to "false"', () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'false', [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'false'  });
        let response = envs();
        expect(response).toMatchObject({
            [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: false,
            [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: false,
        });
    });

    test('Set one env variable to "false" and other to "true"', () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'false', [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: 'true'  });
        let response = envs();
        expect(response).toMatchObject({
            [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: false,
            [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: true,
        });
    });

    test('Set one env variable to "true" and do not pass the other value', () => {
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: 'true',  });
        let response = envs();
        expect(response).toMatchObject({
            [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: true,
            [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: false,
        });
    });

    test('Should throw error for values other than true or false strings', () => {
        const envValue = 'falsee';
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_COMMIT_BUTTON]: envValue });
        try {
            envs();
        } catch (error) {
            expect(error.message).toBe(`Environment variable: "SHOULD_DISPLAY_VIEW_COMMIT_BUTTON" has the value "${envValue}". Allowed values - "true" or "false"`);
        }
    });

    test('Should throw error for number types', () => {
        const envValue = 41;
        process.env = Object.assign(process.env, { [SHOULD_DISPLAY_VIEW_RUN_BUTTON]: envValue });
        try {
            envs();
        } catch (error) {
            expect(error.message).toBe(`Environment variable: "SHOULD_DISPLAY_VIEW_RUN_BUTTON" has the value "${envValue}". Allowed values - "true" or "false"`);
        }
    });
});
