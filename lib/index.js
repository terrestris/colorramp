"use strict";
exports.__esModule = true;
var Color = require("color");
var ColorRamp = (function () {
    function ColorRamp() {
    }
    ColorRamp.getColorRamp = function (colors, steps, format) {
        if (format === void 0) { format = 'hex'; }
        if (steps < 2) {
            steps = 2;
        }
        var hslColors = colors.map(function (color) { return Color(color).hsl(); });
        var calculatedColors = [];
        var additionalSteps = (steps - colors.length) / (colors.length - 1);
        var percentPerStep = colors.length / (steps + additionalSteps) * 100;
        for (var i = 0; i < steps; i++) {
            var percentage = percentPerStep * i;
            var hundreds = Math.floor(percentage / 100);
            var restPercentage = percentage - (hundreds * 100);
            var color1 = hslColors[hundreds];
            var color2 = hslColors[hundreds + 1];
            var newColor = ColorRamp.interpolateColors(color1, color2, restPercentage);
            calculatedColors.push(newColor);
        }
        switch (format.toLowerCase()) {
            case 'hex':
                return calculatedColors.map(function (hslColor) { return hslColor.hex(); });
            case 'rgb':
                return calculatedColors.map(function (hslColor) { return hslColor.rgb(); });
            case 'hsl':
                return calculatedColors.map(function (hslColor) { return hslColor.string(); });
            case 'cmyk':
                return calculatedColors.map(function (hslColor) { return hslColor.cmyk(); });
            case 'color':
                return calculatedColors;
            default:
                return calculatedColors.map(function (hslColor) { return hslColor.hex(); });
        }
    };
    ColorRamp.interpolateColors = function (color1, color2, percentage) {
        percentage = percentage / 100;
        color1 = Color(color1).hsl();
        color2 = Color(color2).hsl();
        var hue1 = color1.hue();
        var hue2 = color2.hue();
        var hueDifference = Math.abs(hue1 - hue2);
        var saturationDifference = Math.abs(color1.saturationl() - color2.saturationl());
        var lightnessDifference = Math.abs(color1.saturationl() - color2.saturationl());
        var smallerValue = hue1 <= hue2 ? hue1 : hue2;
        var largerValue = hue1 > hue2 ? hue1 : hue2;
        var hue;
        if (hueDifference > 180) {
            hueDifference = (smallerValue + 360) - largerValue;
            var stepToGo = hueDifference * percentage;
            if (color1.hue() === smallerValue) {
                hue = smallerValue - stepToGo;
            }
            else {
                hue = largerValue + stepToGo;
            }
        }
        else {
            var stepToGo = hueDifference * percentage;
            if (color1.hue() === smallerValue) {
                hue = smallerValue + stepToGo;
            }
            else {
                hue = largerValue - stepToGo;
            }
        }
        hue = Math.round(hue);
        var saturation = (percentage * saturationDifference) + color1.saturationl();
        var lightness = (percentage * lightnessDifference) + color1.lightness();
        return Color("hsl(" + hue + ", " + saturation + "%, " + lightness + "%)", 'hsl');
    };
    return ColorRamp;
}());
exports["default"] = ColorRamp;
//# sourceMappingURL=index.js.map