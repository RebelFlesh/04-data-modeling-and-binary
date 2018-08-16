'use strict';

module.exports = function (bmp) {
  console.log('Colors inverted!');

  bmp.palette.forEach((color,index)=>{
    var invertedColor = ~color;

    bmp.palette[index] = invertedColor;
  });
};