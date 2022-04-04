const envs = require('./envs');

describe('Environment variables', () => {

    test('Send no env variable', () => {
        let response = envs();
        expect(response).toMatchObject({
            SHOULD_PUBLISH_JOB_STATUS: true
        });
    });

    test('Set env variable to "true"', () => {
        process.env = Object.assign(process.env, { SHOULD_PUBLISH_JOB_STATUS: 'true' });
        let response = envs();
        expect(response).toMatchObject({
            SHOULD_PUBLISH_JOB_STATUS: true
        });
    });

    test('Set env variable to "false"', () => {
        process.env = Object.assign(process.env, { SHOULD_PUBLISH_JOB_STATUS: 'false' });
        let response = envs();
        expect(response).toMatchObject({
            SHOULD_PUBLISH_JOB_STATUS: false
        });
    });

    test('Should throw error for values other than true or false strings', () => {
        const envValue = 'falsee';
        process.env = Object.assign(process.env, { SHOULD_PUBLISH_JOB_STATUS: envValue });
        try {
            envs();
        } catch (error) {
            expect(error.message).toBe(`Environment variable: "SHOULD_PUBLISH_JOB_STATUS" has the value "${envValue}". Allowed values - "true" or "false"`);
        }
    });

    test('Should throw error for number types', () => {
        const envValue = 41;
        process.env = Object.assign(process.env, { SHOULD_PUBLISH_JOB_STATUS: envValue });
        try {
            envs();
        } catch (error) {
            expect(error.message).toBe(`Environment variable: "SHOULD_PUBLISH_JOB_STATUS" has the value "${envValue}". Allowed values - "true" or "false"`);
        }
    });
});
