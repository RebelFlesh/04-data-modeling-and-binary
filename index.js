'use strict';


const Bitmap = require('./lib/bitmap');
const requrieAll = requrieAll('requrie-all');
const transformLibrary = requrieAll(`${__dirname}/lib/transfomrs`);
console.log(transformLibrary);

const [/*ignored*/, /*ignored*/, inFile, outFile, ...transformNames] = process.argv;
console.log({inFile, outFile, transformNames});

//creates bmp object instance from infile
var bmp = Bitmap.fromFile(inFile);

// Manual transform
const invert = require('./lib/transforms/invert-palette');
invert(bmp);

//loops through our transforms calling them automatically
transformNames.forEach(transformName =>{

  //sets the current transform to be called later
  var transform = transformLibrary[transformName];

  //checks if the current element is an actual funciton in the libraray
  if(transform){
    transform(bmp);
  }
  else {
    console.warn(`Transfomr '${transformName}' not found`);
  }
});

//adds file to the outfile
bmp.writeToFile(outFile);