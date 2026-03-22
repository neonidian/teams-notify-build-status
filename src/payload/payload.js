const CustomizeCard = require("./customize-card/CustomizeCard");

const payLoad = function constructPayload(message, annotations {
    status,
    title,
    titleBackgroundColor,
}) {
    return new CustomizeCard(message, annotations, {
        status,
        title,
        titleBackgroundColor,
    }).constructCard();
};

module.exports = payLoad;
