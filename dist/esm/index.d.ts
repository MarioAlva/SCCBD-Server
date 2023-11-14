export declare class RsaPublicKey {
    e: bigint;
    n: bigint;
    constructor(e: bigint, n: bigint);
    encrypt: (m: bigint) => any;
    verify: (s: bigint) => any;
    toJSON: () => {
        e: any;
        n: any;
    };
    static fromJSON: (pubKeyJSON: {
        e: string;
        n: string;
    }) => RsaPublicKey;
}
export declare class RsaPrivateKey {
    d: bigint;
    n: bigint;
    constructor(d: bigint, n: bigint);
    decrypt: (c: bigint) => any;
    sign: (m: bigint) => any;
    toJSON: () => {
        d: any;
        n: any;
    };
    static fromJSON: (pubKeyJSON: {
        e: string;
        n: string;
    }) => RsaPublicKey;
}
export declare function generateRSAKeys(bitlength: number): {
    publicKey: RsaPublicKey;
    privateKey: RsaPrivateKey;
};
