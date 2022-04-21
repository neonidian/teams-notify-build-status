const CustomizeCard = require("./customize-card/CustomizeCard");

const payLoad = function constructPayload(message, {
    status,
    title,
    titleBackgroundColor,
}) {
    return new CustomizeCard(message, {
        status,
        title,
        titleBackgroundColor,
    }).constructCard();
};

module.exports = payLoad;
