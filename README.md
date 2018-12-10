![Build Status](https://travis-ci.com/terrestris/colorramp.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/terrestris/colorramp/badge.svg?branch=master)](https://coveralls.io/github/terrestris/colorramp?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/terrestris/geostyler.svg)](https://greenkeeper.io/)

# colorramp

A module to create colorramps and interpolate colors.
Get if via [NPM](https://www.npmjs.com/package/colorramp):

```
npm i colorramp
```

```javascript
ColorRamp.getColorRamp(['red', 'lime'], 3); // ['#FF0000', '#FFFF00', '#00FF00']
ColorRamp.interpolateColors('#FF0000', '#00FF00', 50); // '#FFFF00'
```

