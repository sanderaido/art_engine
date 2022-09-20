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
    // let newLayer = [];
    let attributes = item.attributes;
    attributes.forEach((attribute) => {
        let traitType = attribute.trait_type;
        // let value = attribute.value;
        if(!layers.includes(traitType)) {
            layers.push(traitType);
        }
        // newLayer.push(traitType);
    });
    // if (!layers.includes(traitTYpe))
    // layers[]
});

console.log(layers);
// console.log(rarityData);


fs.writeFileSync(`${basePath}/rarity/json/_metadata.json`, JSON.stringify(data, null, 2));

console.log(`Hey, it didn't error out`);