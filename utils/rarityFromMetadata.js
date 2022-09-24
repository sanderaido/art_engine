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

let layers = [];

// Get layers
data.forEach((item) => {
  let attributes = item.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    if(!layers.includes(traitType)) {
      let newLayer = [{
        trait: traitType,
        count: 0,
      }]
      layers[traitType] = newLayer;
    }
  });
});

// Count each trait in each layer
data.forEach((item) => {
  let attributes = item.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;
    if(layers[traitType][0].trait == traitType) {
      layers[traitType][0].trait = value;
      layers[traitType][0].count = 1;
    } else {
      let layerExists = false;
      for (let i = 0; i < layers[traitType].length; i++) {
        if(layers[traitType][i].trait == value) {
          layers[traitType][i].count++;
          layerExists = true;
          break;
        }
      }
      if(!layerExists) {
        let newTrait = {
          trait: value,
          count: 1,
        }
        layers[traitType].push(newTrait);
      }
    }
  }); 
});

// Calculate score for each item based on trait counts 
let scores = []; 
data.forEach((item) => {
  let rarityScore = 0
  let attributes = item.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;
    for (let i = 0; i < layers[traitType].length; i++) {
      if(layers[traitType][i].trait == value) {
        rarityScore += layers[traitType][i].count;
      }    
    }
  });
  let scoreTrait = {
    trait_type: "rarityScore",
    value: rarityScore,
  }
  item.attributes.push(scoreTrait);
  scores.push(rarityScore);
  fs.writeFileSync(`${basePath}/build_new/json/${item.edition}.json`, JSON.stringify(item, null, 2));
});

fs.writeFileSync(`${basePath}/build_new/json/_metadata.json`, JSON.stringify(data, null, 2));

// Sort scores decending
scores.sort((a,b) => b-a);

// Read new json data to pull scores
let newRawdata = fs.readFileSync(`${basePath}/build_new/json/_metadata.json`);
let newData = JSON.parse(newRawdata);

/*
create sorted list of scores above
compare score in each item to array, when it matches, assign the next rank
decrement from collectionSize
*/
let rank = editionSize;

newData.forEach((item) => {
  console.log(item.attributes.trait_type);
  // for(let i = 0; scores.length; i++) {
  //   if (scores[i] == item.attributes..value) {
  //     let newRank = {
  //       trait_type: "Rank",
  //       value: rank,
  //     }
  //     item.attributes.push(newRank);
  //     rank--;
  //     fs.writeFileSync(`${basePath}/build_new/json/${item.edition}.json`, JSON.stringify(item, null, 2));
  //     break;
  //   }
  // }


  // let attributes = item.attributes;
  // attributes.forEach((attribute) => {
  //   if (attribute.trait_type == 'rarityScore') {
  //     console.log(attribute.value);



  //     for(let i = 0; scores.length; i++) {
  //       console.log(`score: ${scores[i]}`);
  //       if (scores[i] == attribute.value) {
  //         let newRank = {
  //           trait_type: "Rank",
  //           value: rank,
  //         }
  //         item.attributes.push(newRank);
  //         rank--;
  //         fs.writeFileSync(`${basePath}/build_new/json/${item.edition}.json`, JSON.stringify(item, null, 2));
  //         break;
  //       }
  //     }



      
  //   }
  // });
});

fs.writeFileSync(`${basePath}/build_new/json/_metadata.json`, JSON.stringify(newData, null, 2));

// console.log(layers);

// @Ricky this isn't working for some reason
fs.writeFileSync(`${basePath}/rarity/json/rarityBreakdown.json`, JSON.stringify(layers["test"]));

console.log(`This data can also be viewed in ${basePath}/rarity/json/rarityBreakdown.json`);


// for named rank, mod rarity table from config