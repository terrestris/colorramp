import ColorRamp from './index';
import * as Color from 'color';


describe('ColorRamp', () => {
  test('… is Defined', () => {
    expect(ColorRamp).toBeDefined();
  });

  describe('interpolateColors', () => {
    test('… isDefined', () => {
      expect(ColorRamp.interpolateColors).toBeDefined();
    });
    test('… returns a `color`', () => {
      const got = ColorRamp.interpolateColors('#FF0000', '#00FF00', 0);
      expect(got).toBeInstanceOf(Color);
    });
    test('… returns the first color if percentage is 0', () => {
      const got = ColorRamp.interpolateColors('#FF0000', '#00FF00', 0);
      expect(got.hex()).toEqual('#FF0000');
    });
    test('… returns a color with a quarter of the hue values if percentage is 25', () => {
      const got = ColorRamp.interpolateColors('#FF0000', '#00FF00', 25);
      expect(got.hex()).toEqual('#FF8000');
    });
    test('… returns a color with a half of the hue values if percentage is 50', () => {
      const got = ColorRamp.interpolateColors('#FF0000', '#00FF00', 50);
      expect(got.hex()).toEqual('#FFFF00');
    });
    test('… returns a color with three quarters of the hue values if percentage is 75', () => {
      const got = ColorRamp.interpolateColors('#FF0000', '#00FF00', 75);
      expect(got.hex()).toEqual('#80FF00');
    });
    test('… returns the second color if percentage is 100', () => {
      const got = ColorRamp.interpolateColors('#FF0000', '#00FF00', 100);
      expect(got.hex()).toEqual('#00FF00');
    });
    test('… half of first-half equals first-quarter', () => {
      const quarter = ColorRamp.interpolateColors('#FF0000', '#00FF00', 25);
      const half = ColorRamp.interpolateColors('#FF0000', '#00FF00', 50);
      const halfHalf = ColorRamp.interpolateColors('#FF0000', half.hex(), 50);
      expect(quarter.hex()).toEqual(halfHalf.hex());
    });
    test('… half of second-half equals third-quarter', () => {
      const thirdquarter = ColorRamp.interpolateColors('#FF0000', '#00FF00', 75);
      const half = ColorRamp.interpolateColors('#FF0000', '#00FF00', 50);
      const halfHalf = ColorRamp.interpolateColors(half.hex(), '#00FF00', 50);
      expect(thirdquarter.hex()).toEqual(halfHalf.hex());
    });
  });

  describe('getColorRamp', () => {
    test('… isDefined', () => {
      expect(ColorRamp.getColorRamp).toBeDefined();
    });
    test('… can handle more steps then colors', () => {
      const got = ColorRamp.getColorRamp(['red', 'lime'], 3);
      expect(got).toEqual(['#FF0000', '#FFFF00', '#00FF00']);
    });
    test('… can handle more colors then steps', () => {
      const got = ColorRamp.getColorRamp(['red', 'yellow', 'lime'], 2);
      expect(got).toEqual(['#FF0000', '#00FF00']);
    });
    describe('… returns an array with the expected format', () => {
      test('-> hex as default', () => {
        const got = ColorRamp.getColorRamp(['red', 'lime'], 3);
        expect(got).toEqual(['#FF0000', '#FFFF00', '#00FF00']);
      });
      test('-> hex', () => {
        const got = ColorRamp.getColorRamp(['red', 'lime'], 3, 'hex');
        expect(got).toEqual(['#FF0000', '#FFFF00', '#00FF00']);
      });
      test('-> rgb', () => {
        const got = ColorRamp.getColorRamp(['red', 'lime'], 3, 'rgb');
        expect(got).toEqual(['rgb(255, 0, 0)','rgb(255, 255, 0)', 'rgb(0, 255, 0)']);
      });
      test('-> hsl', () => {
        const got = ColorRamp.getColorRamp(['red', 'lime'], 3, 'hsl');
        expect(got).toEqual(['hsl(0, 100%, 50%)','hsl(60, 100%, 50%)','hsl(120, 100%, 50%)']);
      });
      test('-> color', () => {
        const got = ColorRamp.getColorRamp(['red', 'lime'], 3, 'color');
        const color0: Color = got[0] as Color;
        const color1: Color = got[1] as Color;
        const color2: Color = got[2] as Color;
        expect(color0).toBeInstanceOf(Color);
        expect(color0.hex()).toEqual('#FF0000');
        expect(color1).toBeInstanceOf(Color);
        expect(color1.hex()).toEqual('#FFFF00');
        expect(color2).toBeInstanceOf(Color);
        expect(color2.hex()).toEqual('#00FF00');
      });
    });
  });
});
