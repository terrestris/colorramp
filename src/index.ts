import * as Color from 'color';

type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'color';
type ColorParam = Color | string | ArrayLike<number> | number | { [key: string]: any };

/**
 * @class ColorUtil
 */
class ColorRamp {

  /**
   * Creates a colorramp out of a given array of colors and a given amount of steps.
   *
   * Hint: As the between-colors are calculated by the hue, you should ensure that
   * the hue-difference between the colors is bigger then `steps`.
   *
   * GreyScales are currently not supported!
   *
   * @param {ColorParam[]} colors An array of colors. The colors have to be in one of the formats
   *    supported by the 'color' package.
   * @param {number} steps The amount of colors that should be returned by this function.
   * @param {ColorFormat} format The format in which the returned colors should be represented.
   *    Supported values are: 'hex', 'rgb', 'hsl, 'cmyk' and 'color'. Default is 'hex'
   * @return {ColorParam[]} An array of colors in the specified format.
   * @static
   * @memberof ColorRamp
   */
  static getColorRamp = (colors: ColorParam[], steps: number, format:ColorFormat='hex'): ColorParam[] =>  {
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

    switch (format.toLowerCase()) {
      case 'hex':
        return calculatedColors.map(hslColor => hslColor.hex());
      case 'rgb':
        return calculatedColors.map(hslColor => hslColor.rgb().string());
      case 'hsl':
        return calculatedColors.map(hslColor => hslColor.string());
      case 'color':
        return calculatedColors;
      default:
        return calculatedColors.map(hslColor => hslColor.hex());
    }
  }

  /**
   * Interpolates two colors. The third parameter is the percentage of the second
   * color to be used.
   *
   * @param {ColorParam} color1 The first color used for the interpolation.
   * @param {ColorParam} color2 The second color used for the interpolation.
   * @param {number} percentage The percentage of the second color to be used for
   *    the interpolation.
   * @return {Color} A Color as described by the 'color' package.
   * @static
   * @memberof ColorRamp
   */
  static interpolateColors = (color1: ColorParam, color2: ColorParam, percentage: number): Color => {
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
