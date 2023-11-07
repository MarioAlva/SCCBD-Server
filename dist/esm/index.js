export const encrypt = (str) => {
    const reverse = str.split('').reverse().join('');
    return 'encrypted_' + reverse;
};
export const decrypt = (str) => {
    const strip = str.substring(10); // Let us remove the 'encrypted_' part
    return strip.split('').reverse().join('');
};
