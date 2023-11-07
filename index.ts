// export const encrypt = (str: string) => {
//   const reverse = str.split('').reverse().join('')
//   return 'encrypted_' + reverse
// }

// export const decrypt = (str: string) => {
//   const strip = str.substring(10)  // Let us remove the 'encrypted_' part
//   return strip.split('').reverse().join('')
// }
import * as bcu from 'bigint-crypto-utils'
import { bigintToBase64, base64ToBigint } from 'bigint-conversion'

export class RsaPublicKey {
  e: bigint
  n: bigint
  constructor(e: bigint, n: bigint) {
    this.e = e,
    this.n = n
  }
  encrypt = (m: bigint) => {
    return bcu.modPow(m, this.e, this.n)
  }
  verify = (s: bigint) => {
    return bcu.modPow(s, this.e, this.n)
  }
  toJSON = () => {
    const pubKeyJSON = {
      e: bigintToBase64(this.e),
      n: bigintToBase64(this.n)
    }
    return pubKeyJSON
  }
  static fromJSON = (pubKeyJSON: {e: string, n: string}) => {
    const e = base64ToBigint(pubKeyJSON.e)
    const n = base64ToBigint(pubKeyJSON.n)
    return new RsaPublicKey(e, n)
  }
}

export class RsaPrivateKey {
  d: bigint
  n: bigint
  constructor(d: bigint, n: bigint) {
    this.d = d,
    this.n = n
  }
  decrypt = (c: bigint) => {
    return bcu.modPow(c, this.d, this.n)
  }
  sign = (m: bigint) => {
    return bcu.modPow(m, this.d, this.n)
  }
  toJSON = () => {
    const privKeyJSON = {
      d: bigintToBase64(this.d),
      n: bigintToBase64(this.n)
    }
    return privKeyJSON
  }
  static fromJSON = (pubKeyJSON: {e: string, n: string}) => {
    const e = base64ToBigint(pubKeyJSON.e)
    const n = base64ToBigint(pubKeyJSON.n)
    return new RsaPublicKey(e, n)
  }
}

export function generateRSAKeys(bitlength: number){
  const p = bcu.primeSync(Math.floor(bitlength/2))
  const q = bcu.primeSync(Math.floor(bitlength/2) + 1)
  do{
    var n = p * q
  } while (bcu.bitLength(n) !== bitlength)
  const phi = (p-1n) * (q-1n)
  const e = 65537n
  const d = bcu.modInv(e, phi)
  const publicKey = new RsaPublicKey(e, n)
  const privateKey = new RsaPrivateKey(d, n)
  return {publicKey, privateKey}
}