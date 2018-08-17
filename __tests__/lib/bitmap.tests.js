'use strict';

const fs = require('fs');
const Bitmap = require('../../lib/bitmap');
const fileHouse = `${__dirname}/../../assets/palette-bitmap.bmp`;
const fileHouseOutput = `${__dirname}/../../output/palette-bitmap.bmp`;

describe('Bitmap', ()=>{
  describe('field',()=>{
    it('can read basic header fields',()=>{
      var bmp = Bitmap.fromFile(fileHouse);

      expect(bmp.type).toBe('BM');
      expect(bmp.size).toBeGreaterThan(0);
      expect(bmp.offset).toBeGreaterThan(0);
      expect(bmp.img.length).toBeGreaterThan(0);
      expect(bmp.size).toBeGreaterThanOrEqual(bmp.img.length);
      
      expect(bmp.headerSize).toBe(40);
      expect(bmp.width).toBe(100);
      expect(bmp.height).toBe(100);
      expect(bmp.paletteColorCount).toBe(256);
      expect(bmp.palette.length).toBe(1024);
    });

    it('can read a bitmap asynchronously', done =>{
      Bitmap.fromFileAsync(fileHouse,(err,bmp)=>{
        if(err) throw err;

        expect(bmp.type).toBe('BM');
        done();
      });
    });
    
    afterEach(done=>{
      fs.unlink(fileHouseOutput,err => {
        done();
      });
    });    

    it('can write a new bmp file synchronously', ()=>{
      var bmp = Bitmap.fromFile(fileHouse);
      bmp.writeToFileSync(fileHouseOutput);

      expect(fs.existsSync(fileHouseOutput)).toBe(true);
    });

    it('can wrtie a new bmp file asynchronously',(done)=>{
      var bmp = Bitmap.fromFile(fileHouse);
      bmp.writeToFileAsync(fileHouseOutput,(err)=>{
        if (err) throw err;
        var written = Bitmap.fromFile(fileHouseOutput);
        expect.anything(written);
        done();
      });
    });
  });
});