'use strict';

const path = require('path');
const isLocal = typeof process.pkg === 'undefined';
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const fs = require('fs');

/* **********************
******** Options ********
************************/
const includeRank = false;
const includeRarity = false;


// Read json data
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

// Create new directory if it doesn't already exist
const dir = `${basePath}/rarity/json`;
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, {
		recursive: true
	});
}

let rarityData = [];
let layers = [];

data.forEach((item) => {
  let attributes = item.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    if(!layers.includes(traitType)) {
      let newLayer = {
        trait: traitType,
        count: 0,
      }
      layers.push(newLayer);
    }
  });
});

/* 
layers
  |__data
    |__attributes (filtered for current layer);
*/

// layers.forEach((layer) => {
//   let counts = [];
//   data.forEach((item) => {
//     let attributes = item.attributes;
//     attributes.forEach((attribute) => {
//       let traitType = attribute.trait_type;
//       let value = attribute.value;
//       if(!rarityData.includes(layer)) {
//         let newCount = {
//           trait: value,
//           count: 1,
//         }
//         counts.push(newCount);
//       } 
//     });

//   });
//   console.log(counts);
// })

console.log(layers);

// data.forEach((element) => {
//   let attributes = element.attributes;
//   attributes.forEach((attribute) => {
//     let traitType = attribute.trait_type;
//     let value = attribute.value;

//     let rarityDataTraits = layers[traitType];
//     if (rarityDataTraits != undefined) {
//       rarityDataTraits.forEach((rarityDataTrait) => {
//         if (rarityDataTrait.trait == value) {
//           // keep track of occurrences
//           rarityDataTrait.occurrence++;
//         }
//       });
//     }
//   });
// });

// console.log(rarityData);


fs.writeFileSync(`${basePath}/rarity/json/_metadata.json`, JSON.stringify(data, null, 2));

console.log(`Hey, it didn't error out`);