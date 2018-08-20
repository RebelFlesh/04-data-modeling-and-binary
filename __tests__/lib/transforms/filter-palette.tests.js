'use strict';

const blueFilter = require('../../../lib/transforms/filter-palette');

describe('Blue-filter transform',()=>{
  it('increases the blue in each color',()=>{
    var bmp ={
      palette: new Buffer([0,0,255,0]),
    };
  
    blueFilter(bmp);
  
    expect(bmp.palette).toEqual(new Buffer([255,0,255,0]));
  
  });
});