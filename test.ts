import * as myModule from '.'

const keys = myModule.generateRSAKeys(256)
console.log('Public Key: ' + JSON.stringify(keys.publicKey))
console.log('Private Key: ' + JSON.stringify(keys.privateKey))