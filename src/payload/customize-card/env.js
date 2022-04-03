const core = require('@actions/core');

const env = function environmentVariables() {
    const SHOULD_PUBLISH_JOB_STATUS = 'SHOULD_PUBLISH_JOB_STATUS';
    let allEnvs = {
        SHOULD_PUBLISH_JOB_STATUS
    };
    allEnvs.SHOULD_PUBLISH_JOB_STATUS = process.env[SHOULD_PUBLISH_JOB_STATUS];

    // Debug logging
    core.debug('Environment variables:');
    Object.keys(allEnvs).forEach(item => {
        core.debug(`${item}: ${allEnvs[item]}`);
    });
    core.debug('');

    return {
        SHOULD_PUBLISH_JOB_STATUS
    };
};

module.exports = env;
