const basePath = process.cwd();
const fs = require("fs");
const layersDir = `${basePath}/layers`;

const { layerConfigurations } = require(`${basePath}/src/config.js`);
const { layerVariations } = require(`${basePath}/src/config.js`);

const { getElements } = require("../src/main.js");

/* **********************
******** Options ********
************************/
const includeRank = false;
const includeRarity = false;
/* **********************
******** Options ********
************************/

// read json data
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

// intialize layers to chart
layerConfigurations.forEach((config) => {
  let layers = config.layersOrder;

  layers.forEach((layer) => {
    // get elements for each layer
    let elementsForLayer = [];
    let elements = getElements(`${layersDir}/${layer.name}/`);
    elements.forEach((element) => {
      // just get name and weight for each element
      let rarityDataElement = {
        trait: element.name,
        weight: element.weight, //toFixed(0),
        occurrence: 0, // initialize at 0
      };
      elementsForLayer.push(rarityDataElement);
    });
    let layerName =
      layer.options?.["displayName"] != undefined
        ? layer.options?.["displayName"]
        : layer.name;
    // don't include duplicate layers
    layerVariations.forEach((variation) => {
      let variant = variation.name
      let variantInfo = [];
      console.log(variation.variations.length);
      for (i = 0; variation.variations.length; i++) {
        // let newVariant = {
        //   trait: variation.variations[i],
        //   weight: variation.Weight[i],
        //   occurrence: 0,
        // }
        variantInfo.push("tet");
      }
      console.log(variantInfo);
      // layers.push(variantInfo);
    });
    // console.log(layers);
    elementsForLayer.push("test");
    console.log(elementsForLayer);
    if (!rarityData.includes(layer.name)) {
      // add elements for each layer to chart
      rarityData[layerName] = elementsForLayer;
    }
  });
});

// console.log(rarityData);

// fill up rarity chart with occurrences from metadata
data.forEach((element) => {
  let attributes = element.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;

    let rarityDataTraits = rarityData[traitType];
    if (rarityDataTraits != undefined) {
      rarityDataTraits.forEach((rarityDataTrait) => {
        if (rarityDataTrait.trait == value) {
          // keep track of occurrences
          rarityDataTrait.occurrence++;
        }
      });
    }
  });
});

data.forEach((element) => {

})


// console.log(rarityData);
// console.log(data);

// convert occurrences to occurence string
for (var layer in rarityData) {
  for (var attribute in rarityData[layer]) {
    // get chance
    let chance =
      ((rarityData[layer][attribute].occurrence / editionSize) * 100).toFixed(2);

    // show two decimal places in percent
    rarityData[layer][attribute].occurrence =
      `${rarityData[layer][attribute].occurrence} in ${editionSize} editions (${chance} %)`;
  }
}

fs.writeFileSync(`${basePath}/rarity/json/rarityBreakdown.json`, JSON.stringify(rarityData, null, 2));


// print out rarity data
// for (var layer in rarityData) {
//   console.log(`Trait type: ${layer}`);
//   for (var trait in rarityData[layer]) {
//     console.log(rarityData[layer][trait]);
//   }
//   console.log();
// }
