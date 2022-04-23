function validateUrl(url) {
    try {
        new URL(url);
    } catch (error) {
        throw new Error('Webhook url is not a valid url');
    }
}

module.exports = validateUrl;
