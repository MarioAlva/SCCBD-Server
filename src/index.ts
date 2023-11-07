const bcu = require('bigint-crypto-utils');
//import bigintToBase64 and base64ToBigint from 'bigint-conversion' as commonjs module
const { bigintToBase64, base64ToBigint } = require('bigint-conversion');

//import * as bcu from 'bigint-crypto-utils' as commonjs module
//import { bigintToBase64, base64ToBigint } from 'bigint-conversion' as es module
//import * as bcu from 'bigint-crypto-utils' as es module

export function encrypt(m: bigint, e: bigint, n: bigint) {
    return bcu.modPow(m, e, n)
  }

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
  const publicKey = new RsaPublicKey(e, BigInt(n))
  const privateKey = new RsaPrivateKey(d, BigInt(n))
  return {publicKey, privateKey}
}