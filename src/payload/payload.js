let payLoad = function constructPayload(message) {
    return {
        "text": String(message)
    };
};

module.exports = payLoad;
