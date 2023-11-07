import * as myModule from '.'

const plaintext = 'hello world!'
console.log(`Plaintext: ${plaintext}`)

const ciphertect = myModule.encrypt(plaintext)
console.log('Ciphertext: ' + ciphertect)

const decrypted = myModule.decrypt(ciphertect)
console.log('Decrypted: ' + decrypted)

if (plaintext === decrypted) {
  console.log('Proof of Correctness: OK')
} else {
  console.error('Proof of Correctness: FAILED')
}