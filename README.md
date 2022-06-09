This is a fork of Hashlip's art engine. It is currently a *Work in Progress* as more features are planned to be added. 

🛠️🛠️ Please note that the README is barebones atm as I'm still working on feature implementation, but if you have any questions, please feel free to ask me in the various channels I can be reached. 

<br/>
<br/>

## You can find me on twitter or Discord,

- Twitter: https://twitter.com/WTFdatboi1337
- Discord datboi#1337

<br/>
<br/>

# Additional Features in this fork

## Named rarity weight

- [Use named weights instead of numbers in filename](#use-named-weight-instead-of-filename)
  - [Named weight example](#named-weight-example)

## Resume creation

- [Generate NFT in stages](#generate-nft-in-stages)
  - [resumeNum Example](#resumenum-example)

## Scaled creation

- [Generate NFT in smaller sets for testing](#generate-nft-in-smaller-sets-for-testing)
  - [scaleSize Example](#scalesize-example)

## Utils

- [cleanMetadata](#cleanmetadata)
- [removeAttribute](#removeattribute)
- [generateOldDna](#generateolddna)

### Notes

- [Incompatibilities with original Hashlips](#incompatibilities)


# Use named weights instead of numbers in filename
This fork gives the option to use a simpler weight system by using common rarity names (Common, Uncommon, Rare, Epic, Legenedary, and Mythic) instead of numbers. Weight will be calculated based on named value.

## Named weight example
This repository is set up to use named weights by default. The layers are already using named weights

You can switch back to using numbered weights by setting `namedWeight` to false in config.js. 

```js
// Set this to true if you want to use named rarity instead of numbers. 
const namedWeight = true;
```

# Generate NFT in stages
This fork gives the ability to start generation at any number. This can sometimes be useful, but in 99% of cases generation should be done all at once. These options simply provide tools for the other 1%. Utilizing a previous generations dna will help to prevent duplicates from being generated. Please be sure to utilize the oldDna [Util](#generateolddna).

## resumeNum Example
`resumeNum` can be set independantly to simply start edition at a higher number, but if you want to use old dna, your `resumeNum` must be set and it must equal the number of items in _oldDna.json

```js
const resumeNum = 0;
const importOldDna = false;
```

# Generate NFT in smaller sets for testing
Adjusting every `growEditionSizeTo` anytime you want to test something out on a smaller scale can be frustrating. This system allows you to set your `collectionSize` once, then your `growEditionSizeTo` definitions are replaced with scaleSize. Ensure the numbers fed to that function add up to your `collectionSize`, and you can change `toCreateNow` on the fly to whatever scale you want to test. All rarity is scaled where applicable, so no need to make weight adjustments!
## scaleSize Example
By default, this repository is working with a collection of 10,000, but scaling the size down to 100 for testing purposes. 

```js
const collectionSize = 10000;
const toCreateNow = 100;

const scaleSize = (num) => {
  if (collectionSize === toCreateNow) return num;
  return Math.floor((num / collectionSize) * toCreateNow);
};
```

# Utils

## cleanMetadata
This utility gives the option to remove some commonly request items. Set any to true to remove them from generated metadata. Original metadata is preserved, and clean metadata is saved to build_new/json

```js
let removeDna = true;
let removeEdition = false;
let removeDate = true;
let removeCompiler = false;
```

## removeAttribute
This utility give the ability to remove any attribute either by trait_type, or value. Commonly used to remove 'None', but can be set to remove any attribute. 

```js
let removeValue = "None" //Enter a value you want to remove here. (ie: "None")
let removeTraitType = "" //Enter a Trait you want to remove here. (ie: "Head")
```

## generateOldDna
This utility generates a dnaList for import from a previous generation's metadata. As mentioned several times, the better options is typically to regenerate everything; however, this gives the ability to prevent duplicates from being generated based on old information. 

You must place your previously generated _metadata.json file in the build_old folder. 

🛠️🛠️ Note again that the engine and *especially* documentation are a work in progress. Both will be improved upon further. 