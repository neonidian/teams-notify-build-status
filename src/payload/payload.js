const core = require('@actions/core');
const CustomizeCard = require("./customize-card/CustomizeCard");

let payLoad = function constructPayload(message, options) {
    const isAnyOptionsDefined = Object.keys(options).some(item => options[item] !== '');
    if (!isAnyOptionsDefined) {
        core.debug('No optional inputs specified. So, sending only plain message');
        return {
            "text": String(message)
        };
    } else {
        return new CustomizeCard(message, options).constructJson();
    }
};

module.exports = payLoad;
