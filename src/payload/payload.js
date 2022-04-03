const core = require('@actions/core');

let payLoad = function constructPayload(message, options) {
    const isAnyOptionsDefined = Object.keys(options).some(item => options[item] !== '');
    if (!isAnyOptionsDefined) {
        return {
            "text": String(message)
        };
    } else {
        core.setFailed('Unable to find a valid combination to construct json');
    }
};

module.exports = payLoad;
