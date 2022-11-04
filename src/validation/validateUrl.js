function validateUrl(urls) {
    urls.forEach(url => {
        try {
            new URL(url);
        } catch (error) {
            throw new Error(`Webhook url: "${url}" is not a valid url`);
        }
    });
}

module.exports = validateUrl;
