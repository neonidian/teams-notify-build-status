const colorMapping =
    [
        {
            name: ["success", "green"],
            value: "good"
        },
        {
            name: ["failure", "red"],
            value: "attention"
        },
        {
            name: ["skipped", "blue"],
            value: "accent"
        },
        {
            name: ["cancelled", "yellow"],
            value: "warning"
        },
    ];

const color = (inputColor) => {
    const index = colorMapping.findIndex(color => color.name.indexOf(inputColor.toLowerCase()) !== -1);
    return index === -1 ? "default" : colorMapping[index].value;
};

module.exports = color;
