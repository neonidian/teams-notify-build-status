function validateTitleBackgroundColour(backGroundColour) {
    if (backGroundColour) {
        const allowedBGColors = [
            'success', 'green',
            'failure', 'red',
            'cancelled', 'yellow',
            'skipped', 'blue',
        ];
        if (allowedBGColors.indexOf(backGroundColour) === -1) {
            throw new Error(`Color: "${backGroundColour}" is not supported. Allowed values: "${allowedBGColors.join(', ')}"`);
        }
    }
}

module.exports = validateTitleBackgroundColour;
