const CryptoJS = require("crypto-js");

// https://cryptojs.gitbook.io/docs/

// --------------------------------------------------------------------------
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");

let key = "2e35f242a46d67eeb74aabc37d5e5d05";
let encryptData = AES.encrypt("Message", key).toString(); // Encryption Part
let decryptData = AES.decrypt(encryptData, key).toString(CryptoJS.enc.Utf8); // Message
console.log(decryptData);

// --------------------------------------------------------------------------
//Object encryption
let data = [{id: 1}, {id: 2}];

let ciphertext = CryptoJS.AES.encrypt(
  JSON.stringify(data),
  "secret key 123"
).toString();
let bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log(decryptedData); // [{id: 1}, {id: 2}]

// --------------------------------------------------------------------------
// PBKDF2 --> key 생성 (솔트값, 반복 횟수)
const salt = CryptoJS.lib.WordArray.random(128 / 8);
const key128Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
  keySize: 128 / 32,
});

const key256Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
  keySize: 256 / 32,
});
const key512Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, {
  keySize: 512 / 32,
});
const key512Bits1000Iterations = CryptoJS.PBKDF2("Secret Passphrase", salt, {
  keySize: 512 / 32,
  iterations: 1000,
});

// --------------------------------------------------------------------------
// 인코더
let words = CryptoJS.enc.Base64.parse("SGVsbG8sIFdvcmxkIQ==");
const base64 = CryptoJS.enc.Base64.stringify(words);
words = CryptoJS.enc.Latin1.parse("Hello, World!");
const latin1 = CryptoJS.enc.Latin1.stringify(words);
words = CryptoJS.enc.Hex.parse("48656c6c6f2c20576f726c6421");
const hex = CryptoJS.enc.Hex.stringify(words);
words = CryptoJS.enc.Utf8.parse("𔭢");
const utf8 = CryptoJS.enc.Utf8.stringify(words);
words = CryptoJS.enc.Utf16.parse("Hello, World!");
let utf16 = CryptoJS.enc.Utf16.stringify(words);
words = CryptoJS.enc.Utf16LE.parse("Hello, World!");
utf16 = CryptoJS.enc.Utf16LE.stringify(words);
