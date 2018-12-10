import * as Color from 'color';
declare type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'cymk' | 'color';
declare type ColorParam = Color | string | ArrayLike<number> | number | {
    [key: string]: any;
};
declare class ColorRamp {
    static getColorRamp: (colors: ColorParam[], steps: number, format?: ColorFormat) => ColorParam[];
    static interpolateColors: (color1: ColorParam, color2: ColorParam, percentage: number) => Color;
}
export default ColorRamp;
