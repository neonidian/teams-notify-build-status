const CustomizeCard = require("./customize-card/CustomizeCard");

let payLoad = function constructPayload(message, { status, }) {
    return new CustomizeCard(message, { status, }).constructCard();
};

module.exports = payLoad;
