import ColorRamp from './index';

test('basic', () => {
  expect(ColorRamp).toBeDefined();
});

describe('getColorRamp', () => {
  test('… isDefined', () => {
    expect(ColorRamp.getColorRamp).toBeDefined();
  });
});

describe('interpolateColors', () => {
  test('… isDefined', () => {
    expect(ColorRamp.interpolateColors).toBeDefined();
  });
});
