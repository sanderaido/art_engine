const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);
/* TODO
Priority:
-Fix named weight system. Currently needs a spread of rarities for some reason. 
-Would also like to have no chance of a zero generation. Need to combine the named and exact weight systems, and
  have the traits generate exactly the number the named weight system decides. Probably throw some RNG into those 
  numbers so generating a collection twice won't have the same stuff. 
- Still want an option to generate an exact number of a trait when not using exact weights. Maybe a 
different rarityDelimiter? Like if you define a new variable as $, then when #weight, it generates normally,
but when you have $weight, it generated that number exactly?
============
-Create incompatible layers system.
-work in rarity calculations
-option to include rarity in metadata
- Util to 'bring to front'. This will enable people to move X number of tokens to the first # in the
collection so they can team Mint or whatever without resorting to minting with tokenId.
- option to add numerical trait/attribute. Like a statblock
- Account for traits across multiple layers with the same name in exact weight system. Unique name was expected, 
but traits like 'None' will have their weights counted across multiple layers. Either exclude duplicate trait
names, or require a delimeter like & and use 'attributeCleanName'.
- Adjust scaleMints system to use *actual* # of that layerconfig, rather than cumulative. ie: if I want [10,10,10] 
I should be able to set growEditionSizeTo to [10,10,10] not [10,20,30]. Maybe even have option to set them to %?
-1of1 - similar to ultraRare feature, but allow to happen during generation with option to have all normal metadata traits
set to 1of1 name or for just a single '1of1' trait. Create separate util to create new folder structure for them?
*/

/* DONE
-work in resumeNum functionality
-work in toCreateNow functionality
-rework weight system to simply mark the weight as a rarity name (common, rare, etc.) and have rarity automatic
-work in misc utils
- Continue to build on resumeNum and enable a resumted generation? Maybe pull dna from metadata?
-option to not display none in metadata -- Solution: use removeAttribute
-rework weight system to allow exact counts to be used as weights. 
-work in variation functionality
*/

const collectionSize = 1000;
const toCreateNow = 1000;

const scaleSize = (num) => {
  if (collectionSize === toCreateNow) return num;
  return Math.floor((num / collectionSize) * toCreateNow);
};

// ********* Advanced weight options *********
// Note: only one of these options can be marked true at once. 

// Set this to true if you want to use named rarity instead of numbers. 
const namedWeight = true;
/* 
* Set this to true if you want to use EXACT weights. 
* Note that your weights must add up to the total number
* you want of that trait.
*/
const exactWeight = false;


const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://TESTING";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://linktr.ee/datboi1337",
  creators: [
    {
      address: "9LfrWG5WY7LsJ4yEjwD8NAKZ4mLSTfLFZQ7B61ZqEzBH",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: scaleSize(250),
    layersOrder: [
      // { name: "SkeletalBody" },
      { name: "Head", layerVariations: 'Color' },
      { name: "Back" },
      { name: "Legs" },
      { name: "Arms", layerVariations: 'Color' },
      { name: "Mouth" },
      { name: "Eyes" },
    ],
  },
  {
    growEditionSizeTo: scaleSize(500),
    layersOrder: [
      { name: "Body" },
      { name: "Head"},
      { name: "Back" },
      { name: "Legs" },
      { name: "Arms" },
      { name: "Mouth" },
      { name: "Eyes" },
    ],
  },
  {

    growEditionSizeTo: scaleSize(collectionSize),

    layersOrder: [
      { name: "Body" },
      { name: "Head" },
      { name: "Back" },
      { name: "Legs" },
      { name: "Arms" },
      { name: "Mouth" },
      { name: "Eyes" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 512,
  height: 512,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: false,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Rarity distribution can be adjusted
* Keep range [0 - 10,000]
* Because weight is up to 10,000, percentages can determined up to 
* two decimal places. ie: 10.15% would be 1015
* DO NOT change the rarity names unless you know what you're doing in main.js
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const rarity_config = {
  Mythic: { ranks: [0, 100] }, //, fileName: 'Mythic.png' },
  Legendary: { ranks: [100, 600] }, //, fileName: 'Legendary.png' },
  Epic: { ranks: [600, 1500] }, //, fileName: 'Epic.png' },
  Rare: { ranks: [1500, 3100] }, //, fileName: 'Rare.png' },
  Uncommon: { ranks: [3100, 5600] }, //, fileName: 'Uncommon.png' },
  Common: { ranks: [5600, 10000] }, //, fileName: 'Common.png' },
};

const layerVariations = [
  {
    variationCount: 1,
    name: 'Color',
    variations: [
      'Blue',
      'Green',
      'Purple',
      'Red',
    ],
    Weight: [
      35,
      25,
      25,
      15,
    ],
  },
];

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* Do not use this unless 100% necessary and you understand the risk
* Generating collection in stages leads to potential duplicates. 
* 99% of the time, regenerating is the appropriate option. 
* This is here for the 1%
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const resumeNum = 0;
const importOldDna = false;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* NOTE: As the name implies, this will allow duplicates to be
* generated in the collection. Do not set this to true unless
* you specifically want duplicates in your collection.
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const allowDuplicates = false;

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  resumeNum,
  rarity_config,
  toCreateNow,
  collectionSize,
  namedWeight,
  exactWeight,
  layerVariations,
  importOldDna,
  allowDuplicates,
};
