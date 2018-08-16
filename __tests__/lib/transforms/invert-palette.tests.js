'use strict';

const invert = require('../../../lib/transforms/invert-palette');

describe('invert transform', ()=>{
  it('inverts all palette colors',()=>{
    var bmp ={
      palette: new Buffer([0,200,255,55]),
    };

    invert(bmp);

    expect(bmp.palette).toEqual(new Buffer([255,55,0,200]));
  });
}) ;