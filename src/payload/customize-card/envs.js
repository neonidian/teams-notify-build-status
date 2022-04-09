const core = require('@actions/core');

const envs = function environmentVariables() {
    // Environment variable names
    const SHOULD_DISPLAY_VIEW_RUN_BUTTON = defineEnvironmentVariable('SHOULD_DISPLAY_VIEW_RUN_BUTTON', false);
    const SHOULD_DISPLAY_VIEW_COMMIT_BUTTON = defineEnvironmentVariable('SHOULD_DISPLAY_VIEW_COMMIT_BUTTON', false);

    const envVariableNames = [
        SHOULD_DISPLAY_VIEW_RUN_BUTTON,
        SHOULD_DISPLAY_VIEW_COMMIT_BUTTON
    ];

    // Read env variable values, set to default if value not set
    const allEnvs = {};
    envVariableNames.forEach(envName => {
        const envElement = process.env[envName[0]];
        allEnvs[envName[0]] = envElement ? validateEnvVariableName(envName[0], envElement) : envName[1];
        }
    );

    // Debug logging
    if (core.isDebug()) {
        core.debug('Environment variables:');
        Object.keys(allEnvs).forEach(item => {
            core.debug(`${item}: ${allEnvs[item]}`);
        });
        core.debug('');
    }
    return allEnvs;
};

function defineEnvironmentVariable(envVariableName, defaultValue) {
    return [envVariableName, defaultValue];
}

function validateEnvVariableName(envVariableName, value) {
    if (value.toString().trim() === 'true') {
        return true;
    } else if (value.toString().trim() === 'false') {
        return false;
    } else {
        throw new Error(`Environment variable: "${envVariableName}" has the value "${value}". Allowed values - "true" or "false"`);
    }
}

module.exports = envs;
