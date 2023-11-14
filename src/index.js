"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const encrypt = (str) => {
    const reverse = str.split('').reverse().join('');
    return 'encrypted_' + reverse;
};
exports.encrypt = encrypt;
const decrypt = (str) => {
    const strip = str.substring(10); // Let us remove the 'encrypted_' part
    return strip.split('').reverse().join('');
};
exports.decrypt = decrypt;
