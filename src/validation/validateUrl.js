function validateUrl(url) {
    try {
        return new URL(url);
    } catch (error) {
        throw new Error('Webhook url is not a valid url');
    }
}

module.exports = validateUrl;
