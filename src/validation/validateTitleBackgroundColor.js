function validateTitleBackgroundColour(backGroundColour) {
    if (backGroundColour) {
        const allowedBGColors = require('./validColorValues.json').validColorValues;
        if (allowedBGColors.indexOf(backGroundColour) === -1) {
            throw new Error(`Color: "${backGroundColour}" is not supported. Allowed values: "${allowedBGColors.join('", "')}"`);
        }
    }
}

module.exports = validateTitleBackgroundColour;
