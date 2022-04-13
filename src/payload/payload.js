const CustomizeCard = require("./customize-card/CustomizeCard");

let payLoad = function constructPayload(message, {
    status,
    title,
}) {
    return new CustomizeCard(message, {
        status,
        title,
    }).constructCard();
};

module.exports = payLoad;
