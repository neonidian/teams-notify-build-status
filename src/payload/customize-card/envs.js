const core = require('@actions/core');

const envs = function environmentVariables() {
    // Environment variable names
    const SHOULD_PUBLISH_JOB_STATUS = 'SHOULD_PUBLISH_JOB_STATUS';

    const envVariableNames = [
        SHOULD_PUBLISH_JOB_STATUS
    ];

    // Read env variable values
    const allEnvs = {};
    envVariableNames.forEach(envName => allEnvs[envName] = process.env[envName]);

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

module.exports = envs;
