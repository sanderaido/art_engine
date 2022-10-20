const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const collectionSize = 100;
const toCreateNow = 100;
const randomSeed = 123; // between 100-1000 seems a good range

const scaleSize = (num) => {
  if (collectionSize === toCreateNow) return num;
  return Math.ceil((num / collectionSize) * toCreateNow);
};

// ********* Advanced weight options *********
// Note: only one of these options can be marked true at once. 

// Set this to true if you want to use named rarity instead of numbers. 
const namedWeight = false;
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
      address: "8DsAhDisG5eYjBwedSiakTKwrYCWpQ4tNDRuZyniMXaX",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: scaleSize(collectionSize),
    layersOrder: [
      { name: "background" },
      { name: "doodles" },
      { name: "logos" },
      { name: "titles" },
    ],
  },
];

const enableStats = false;
const statBlocks = [
  // These are all examples with different display_types. Please refer to Opensea metadata standards for visual examples 
  {
    minValue: 1,
    maxValue: 50,
    attribute:
    {
      trait_type: "Stamina", 
      value: 0
    },
  },
  {
    minValue: 1,
    maxValue: 999,
    attribute:
    {
      display_type: "number", 
      trait_type: "Stamina", 
      value: 0
    },
  },
  {
    minValue: 1,
    maxValue: 100,
    attribute:
    {
      display_type: "boost_percentage", 
      trait_type: "Stamina Increase", 
      value: 0
    }, 
  },
  {
    minValue: 25,
    maxValue: 75,
    attribute:
    {
      display_type: "boost_number", 
      trait_type: "Stamina Boost", 
      value: 0
    }, 
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 1080,
  height: 1920,
  dpi: 72,
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

const extraAttributes = [];

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
      15,
      25,
      25,
      35,
    ],
  }
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
  randomSeed,
  namedWeight,
  exactWeight,
  layerVariations,
  importOldDna,
  allowDuplicates,
  enableStats,
  statBlocks,
  extraAttributes,
};
