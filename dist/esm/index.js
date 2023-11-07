const bcu = require('bigint-crypto-utils');
//import bigintToBase64 and base64ToBigint from 'bigint-conversion' as commonjs module
const { bigintToBase64, base64ToBigint } = require('bigint-conversion');
//import * as bcu from 'bigint-crypto-utils' as commonjs module
//import { bigintToBase64, base64ToBigint } from 'bigint-conversion' as es module
//import * as bcu from 'bigint-crypto-utils' as es module
export function encrypt(m, e, n) {
    return bcu.modPow(m, e, n);
}
export class RsaPublicKey {
    constructor(e, n) {
        this.encrypt = (m) => {
            return bcu.modPow(m, this.e, this.n);
        };
        this.verify = (s) => {
            return bcu.modPow(s, this.e, this.n);
        };
        this.toJSON = () => {
            const pubKeyJSON = {
                e: bigintToBase64(this.e),
                n: bigintToBase64(this.n)
            };
            return pubKeyJSON;
        };
        this.e = e,
            this.n = n;
    }
}
RsaPublicKey.fromJSON = (pubKeyJSON) => {
    const e = base64ToBigint(pubKeyJSON.e);
    const n = base64ToBigint(pubKeyJSON.n);
    return new RsaPublicKey(e, n);
};
export class RsaPrivateKey {
    constructor(d, n) {
        this.decrypt = (c) => {
            return bcu.modPow(c, this.d, this.n);
        };
        this.sign = (m) => {
            return bcu.modPow(m, this.d, this.n);
        };
        this.toJSON = () => {
            const privKeyJSON = {
                d: bigintToBase64(this.d),
                n: bigintToBase64(this.n)
            };
            return privKeyJSON;
        };
        this.d = d,
            this.n = n;
    }
}
RsaPrivateKey.fromJSON = (pubKeyJSON) => {
    const e = base64ToBigint(pubKeyJSON.e);
    const n = base64ToBigint(pubKeyJSON.n);
    return new RsaPublicKey(e, n);
};
export function generateRSAKeys(bitlength) {
    const p = bcu.primeSync(Math.floor(bitlength / 2));
    const q = bcu.primeSync(Math.floor(bitlength / 2) + 1);
    do {
        var n = p * q;
    } while (bcu.bitLength(n) !== bitlength);
    const phi = (p - 1n) * (q - 1n);
    const e = 65537n;
    const d = bcu.modInv(e, phi);
    const publicKey = new RsaPublicKey(e, BigInt(n));
    const privateKey = new RsaPrivateKey(d, BigInt(n));
    return { publicKey, privateKey };
}
