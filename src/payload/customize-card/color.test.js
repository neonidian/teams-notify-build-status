const color = require('./color');
const validColors = require('../../validation/validColorValues.json');

describe('Test color', () => {
    const adaptiveCardColors = ["good", "attention", "accent", "warning"];

    test('Verify color module only maps the valid colors', () => {
        for (let inputColor of validColors.validColorValues) {
            expect(adaptiveCardColors.indexOf(color(inputColor))).toBeGreaterThanOrEqual(0);
        }
    });

    test('Verify unsupported color returns the value "default"', () =>
        expect(color("foo")).toBe("default"));

    test('Verify camel-case status input "Success" returns a valid color', () =>
        expect(color("Success")).toBe("good"));

    test('Verify capitalized color "YELLOW" returns a valid color', () =>
        expect(color("YELLOW")).toBe("warning"));
});
