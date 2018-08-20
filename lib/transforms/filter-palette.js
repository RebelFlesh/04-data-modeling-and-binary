'use strict';

module.exports = function (bmp) {
  console.log('Bluifing colors!');

  for(let i = 0;i<bmp.palette.length;i+=4){
    bmp.palette[i] = 255;
  }
};