var bip39 = require('bip39'); // npm i -S bip39
var crypto = require('crypto');

function getWordsAfterFirst(input) {
  var words = input.split(' ');
  // This will remove the first word from the array
  return words;
}

async function getWallet() {
  console.log('inside the get wallet gunction');
  try {
    // what you describe as 'seed'
    var randomBytes = crypto.randomBytes(16); // 128 bits is enough

    // your 12 word phrase
    var mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'));
    return getWordsAfterFirst(mnemonic);
  } catch (error) {}
}

export default async function (req, res) {
  if (req.method !== 'GET') {
    return res.status(401);
  }
  try {
    const walletWords = await getWallet();
    res.json(walletWords);
  } catch (error) {
    console.log('the error is: ', error);
    res.json(error);
  }
}
