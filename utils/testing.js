'use strict';

const fs = require('fs');
const path = require('path');
const isLocal = typeof process.pkg === 'undefined';
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const dir = `${basePath}/build/json`;

// Read json data
// let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
// let data = JSON.parse(rawdata);

// Create new directory if it doesn't already exist
const newDir = `${basePath}/build_new/json`;
if (!fs.existsSync(newDir)) {
	fs.mkdirSync(newDir, {
		recursive: true
	});
}

// console.log(dir);

let files = fs.readdirSync(dir);

// let sortedFiles = filenames.sort()
const sortedFileNames = () => {
  let filenames  = [];
  files.forEach(file => {
    const str = file
    const filename = Number(str.split('.').slice(0, -1).join('.'));
    // console.log(num[0]);

    return filenames.push(filename);

  })

  filenames.sort(function(a, b) {
    return a - b;
  });

  console.log(filenames);
}

console.log(sortedFileNames());

// // let finalContent = {};
// const read_directory = async dir =>
//     fs.readdirSync(dir) => {
//         filePath = path.join(dir, file);
//         console.log(filePath);
//         let content = require(filePath);
//         finalContent.passed += content.passed;
//         finalContent.fixtures = finalContent.fixtures.concat(content.fixtures);
//         return finalContent;
//     }
    
// read_directory(dir).then(data => {
//     fs.writeFileSync('./final.json', JSON.stringify(data));
// });




/*
let removeValue = "None" //Enter a value you want to remove here. (ie: "None")
let removeTraitType = "" //Enter a Trait you want to remove here. (ie: "Head")

data.forEach((item) => {
  var resultValue=item.attributes.filter(obj=> obj.value !== removeValue); // value removal
  var result=resultValue.filter(obj=> obj.trait_type !== removeTraitType); // trait_types removal
  item.attributes = result;
  fs.writeFileSync(`${basePath}/build_new/json/${item.edition}.json`, JSON.stringify(item, null, 2));
});

fs.writeFileSync(`${basePath}/build_new/json/_metadata.json`, JSON.stringify(data, null, 2));

console.log(`Removed all ${removeValue} and ${removeTraitType} attributes`);
*/