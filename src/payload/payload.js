const CustomizeCard = require("./customize-card/CustomizeCard");

let payLoad = function constructPayload(message, options) {
    return new CustomizeCard(message, options).constructCard();
};

module.exports = payLoad;
