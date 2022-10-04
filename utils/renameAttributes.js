'use strict';

const path = require('path');
const isLocal = typeof process.pkg === 'undefined';
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require('fs');

// Read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

// Create new directory if it doesn't already exist
const dir = `${basePath}/build_new/json`;
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, {
		recursive: true
	});
}

let valueBefore = [ "FishHead", "Test" ] //Enter values you want to remove here. (ie: "None")
let valueAfter = [ "None", "Testy" ] //Enter values you want to remove here. (ie: "None")

data.forEach((item) => {
  let attributes = item.attributes;
  let tempAttributes = [];
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;
    for (let i = 0; i < valueBefore.length; i++) {
      let newValue = value.replace(valueBefore[i], valueAfter[i]);
      tempAttributes.push(newValue);
    }
  })
  console.log(tempAttributes);


  
  // removeValue.forEach((traitValue) => {
  //   let newValue = item.attributes.filter(obj=> obj.value !== traitValue);
  //   item.attributes = newValue;
  // })
  // removeTraitType.forEach((traitType) => {
  //   let newValue = item.attributes.filter(obj=> obj.trait_type !== traitType);
  //   item.attributes = newValue;
  // })
  fs.writeFileSync(`${basePath}/build_new/json/${item.edition}.json`, JSON.stringify(item, null, 2));
});

fs.writeFileSync(`${basePath}/build_new/json/_metadata.json`, JSON.stringify(data, null, 2));

// console.log(`Removed all traits with ${removeValue} value(s) and ${removeTraitType} trait_type(s)`);