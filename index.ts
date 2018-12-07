import Color from 'color';

type ColorParam = Color | string | ArrayLike<number> | number | { [key: string]: any };

/**
 * @class ColorUtil
 */
class ColorRamp {

  static getColorRamp = (colors: ColorParam[], steps: number, format='hex'): string[] =>  {
    if (steps < 2 ) {
      steps = 2;
    }
    const hslColors = colors.map((color: ColorParam) => Color(color).hsl());
    const calculatedColors: Color[] = [];
    const additionalSteps = (steps - colors.length) / (colors.length-1);
    const percentPerStep = colors.length / (steps + additionalSteps) * 100;

    for (let i = 0; i < steps; i++) {
      const percentage = percentPerStep * i;
      const hundreds = Math.floor(percentage / 100);
      const restPercentage = percentage - (hundreds * 100);
      const color1 = hslColors[hundreds];
      const color2 = hslColors[hundreds + 1];
      const newColor = ColorRamp.interpolateColors(color1, color2, restPercentage);
      calculatedColors.push(newColor);
    }

    const formattedColors = calculatedColors.map(hslColor => hslColor.hex());
    return formattedColors;
  }

  static interpolateColors = (color1: ColorParam, color2: ColorParam, percentage: number) => {
    percentage = percentage / 100;
    color1 = Color(color1).hsl();
    color2 = Color(color2).hsl();
    let hue1 = color1.hue();
    let hue2 = color2.hue();
    let hueDifference = Math.abs(hue1 - hue2);
    const saturationDifference = Math.abs(color1.saturationl() - color2.saturationl());
    const lightnessDifference = Math.abs(color1.saturationl() - color2.saturationl());
    const smallerValue = hue1 <= hue2 ? hue1 : hue2;
    const largerValue = hue1 > hue2 ? hue1 : hue2;
    let hue: number;

    if (hueDifference > 180) {
      hueDifference = (smallerValue + 360) - largerValue;
      const stepToGo = hueDifference * percentage;
      if (color1.hue() === smallerValue) {
        hue = smallerValue - stepToGo;
      } else {
        hue = largerValue + stepToGo;
      }
    } else {
      const stepToGo = hueDifference * percentage;
      if (color1.hue() === smallerValue) {
        hue = smallerValue + stepToGo;
      } else {
        hue = largerValue - stepToGo;
      }
    }

    hue = Math.round(hue);
    const saturation = (percentage * saturationDifference) + color1.saturationl();
    const lightness = (percentage * lightnessDifference) + color1.lightness();
    return Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`, 'hsl');
  }

}

export default ColorRamp;
