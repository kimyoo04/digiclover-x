// https://slidesplayer.org/slide/15368674/

const forge = require("node-forge");

const key = forge.random.getBytesSync(16);
const iv = forge.random.getBytesSync(16);

let inputText = "kimyoo is";
console.log("Input Text: " + inputText);

let cipher = forge.cipher.createCipher("AES-CBC", key);
cipher.start({iv: iv});
cipher.update(forge.util.createBuffer(inputText));
cipher.finish();
let encrypted = cipher.output;

// outputs encrypted hex
console.log(encrypted.toHex());

let decipher = forge.cipher.createDecipher("AES-CBC", key);
decipher.start({iv: iv});
decipher.update(encrypted);
const result = decipher.finish();

// check 'result' for true/false
console.log("decipher result is -", result);

// outputs decrypted hex
console.log(decipher.output.data);
// console.log(decipher.output.toHex());

console.log(`
--------------------------------------------------------
--------------------------------------------------------
`);

inputText = "md5 활용하는 것";
console.log("Input Text: " + inputText);

let md = forge.md.md5.create();
md.update(inputText);
let resultMD = md.digest();
console.log(resultMD);
console.log("MD5: " + forge.util.bytesToHex(resultMD));

console.log(`
--------------------------------------------------------
--------------------------------------------------------
`);

inputText = "해시함수들 나열하기";
console.log("Input Text: " + inputText);

md = forge.md.md5.create();
md.update(inputText);
console.log("MD5: " + md.digest().toHex());
md = forge.md.sha1.create();
console.log("SHA1: " + md.digest().toHex());
md = forge.md.sha256.create();
console.log("SHA256: " + md.digest().toHex());
md = forge.md.sha384.create();
console.log("SHA384: " + md.digest().toHex());
md = forge.md.sha512.create();
console.log("SHA512: " + md.digest().toHex());
md = forge.md.sha512.sha256.create();
console.log("SHA512.SHA256: " + md.digest().toHex());

console.log(`
--------------------------------------------------------
--------------------------------------------------------
`);

inputText = "HMAC 활용하기";
console.log("Input Text: " + inputText);
console.log("Key: " + key);

const hmac = forge.hmac.create();
hmac.start("md5", key);
hmac.update(inputText);
console.log("Hmac(md5): " + hmac.digest().toHex());
hmac.start("sha1", key);
console.log("Hmac(sha1): " + hmac.digest().toHex());
hmac.start("sha256", key);
console.log("Hmac(sha256): " + hmac.digest().toHex());
hmac.start("sha384", key);
console.log("Hmac(sha384): " + hmac.digest().toHex());
hmac.start("sha512", key);
console.log("Hmac(sha512): " + hmac.digest().toHex());

console.log(`
--------------------------------------------------------
--------------------------------------------------------
`);

// DIGEST = PBKDF2(PRF, Password, Salt, c, DLen)
// PRF: 난수(예: HMAC)
// Password: 패스워드
// Salt: 암호학 솔트
// c: 원하는 iteration 반복 수
// DLen: 원하는 다이제스트 길이

// generate a password-based 16-byte key
// note an optional message digest can be passed as the final parameter
const salt = forge.random.getBytesSync(128);
const numIterations = 5;
const password = "pbkdf2 활용하기";
console.log("password", password);
const derivedKey = forge.pkcs5.pbkdf2(password, salt, numIterations, 16);
// generate key asynchronously
// note an optional message digest can be passed before the callback
forge.pkcs5.pbkdf2(
  password,
  salt,
  numIterations,
  16,
  function (err, derivedKey) {
    console.log("Derived key - sync: ", forge.util.bytesToHex(derivedKey));
    console.log(`
--------------------------------------------------------
--------------------------------------------------------
`);
  }
);

// generate a random prime on the main JS thread
const bits = 1024;
forge.prime.generateProbablePrime(bits, function (err, num) {
  console.log("random prime 1: ", num.toString(16));
});
// generate a random prime using Web Workers (if available, otherwise
// falls back to the main thread)
const options = {
  algorithm: {
    name: "PRIMEINC",
    workers: -1, // auto-optimize # of workers
  },
};
forge.prime.generateProbablePrime(bits, options, function (err, num) {
  console.log("random prime 2: ", num.toString(16));
  console.log(`
--------------------------------------------------------
--------------------------------------------------------
`);
});

// PRNG (Pseudo Random Number Generation) 의사난수생성
// 완전한 난수를 생성하는 것은 아니며 계산하는 알고리즘은 정해져 있 으므로 의사난수라고 부름
// 동기식 난수생성: forge.random.getBytesSync
// 비동기식 난수생성: forge.random.getBytes

let bytes = forge.random.getBytesSync(32);
console.log("PRNG-sync: " + forge.util.bytesToHex(bytes));
// get some random bytes asynchronously
forge.random.getBytes(32, function (err, bytes) {
  console.log("PRNG-async: " + forge.util.bytesToHex(bytes));
});
bytes = forge.random.getBytesSync(64);
forge.random.getBytes(64, function (err, bytes) {});

// Hex – 4비트 표현, 0-9A-F
// Base64 – 6비트 표현
// Byte – 8비트 표현
// UTF-8 – 세계의 많은 언어를 표현하기 위한 표준 인코딩 방식
//  유니코드를 위한 가변 길이 문자 인코딩 방식
// Universal Coded Character Set + Transformation Format – 8- bit
// 유니코드 한 문자를 나타내기 위해 1바이트에서 4바이트까지를 사용
// Forge.util 객체 제공

inputText = "The quick brown 한글 테스트";
console.log("Input Text: " + inputText);
console.log();

// encode/decode base64
encoded = forge.util.encode64(inputText);
console.log("Base64: " + encoded);
str = forge.util.decode64(encoded);
console.log("Recovered: " + str);

// encode/decode UTF-8
let encoded = forge.util.encodeUtf8(inputText);
console.log("UTF8: " + encoded);
let str = forge.util.decodeUtf8(encoded);

// bytes to/from hex
hex = "10e d78bbc60834bfd338ff1497b6";
bytes = forge.util.hexToBytes(hex);
console.log("hexToBytes: " + bytes);
hex = forge.util.bytesToHex(bytes);
console.log("bytesToHex: " + hex);

console.log(`
--------------------------------------------------------
--------------------------------------------------------
`);

// buffer 생성
inputText = "buffer 만들기";
cipher = forge.cipher.createCipher("AES-CBC", key);
cipher.start({iv: iv});
cipher.update(forge.util.createBuffer(inputText));
cipher.finish();
encrypted = cipher.output;

// outputs encrypted hex
console.log(encrypted.toHex());

decipher = forge.cipher.createDecipher("AES-CBC", key);
decipher.start({iv: iv});
decipher.update(encrypted);
decipher.finish();

// outputs decrypted hex
console.log(decipher.output.toHex());

console.log(`
--------------------------------------------------------
--------------------------------------------------------
`);

inputText = "Hello world - 헬로월드";
const someBytes = forge.util.encodeUtf8(inputText);
console.log("AES-128-CBC");

const keySize = 16; // 16 => AES-128, 24 => AES-192, 32 => AES-256
key = forge.random.getBytesSync(keySize);
iv = forge.random.getBytesSync(keySize);

cipher = forge.cipher.createCipher("AES-CBC", key);
cipher.start({iv: iv});
cipher.update(forge.util.createBuffer(someBytes));
cipher.finish();
encrypted = cipher.output;

// outputs encrypted hex
console.log("- Encrypted: " + encrypted.toHex());

decipher = forge.cipher.createDecipher("AES-CBC", key);
decipher.start({iv: iv});
decipher.update(encrypted);
decipher.finish();

console.log("- Decrypted: " + decipher.output);
console.log(`
--------------------------------------------------------
--------------------------------------------------------
`);

inputText = "Hello world hello world";
let rsa = forge.pki.rsa;
let keypair = rsa.generateKeyPair({bits: 1024, e: 0x10001});
let publicKey = keypair.publicKey;
let privateKey = keypair.privateKey;

// - 공개키를 PEM 형식으로 출력
console.log("Public key: \n" + forge.pki.publicKeyToPem(publicKey));
// - 개인키를 PEM 형식으로 출력
console.log("Private key: \n" + forge.pki.privateKeyToPem(privateKey));
console.log();

// encrypt data with a public key (defaults to RSAES PKCS#1 v1.5)
console.log("defaults to RSAES PKCS#1 v1.5");
encrypted = publicKey.encrypt(inputText);
console.log("Encrypted: " + forge.util.bytesToHex(encrypted));

// decrypt data with a private key (defaults to RSAES PKCS#1 v1.5)
let decrypted = privateKey.decrypt(encrypted);
console.log("Decrypted: " + decrypted);
// encrypt data with a public key using RSAES-OAEP
console.log("RSA-OAEP"); // RSA-OAEP : OAEP 패딩
encrypted = publicKey.encrypt(inputText, "RSA-OAEP");
// decrypt data with a private key using RSAES-OAEP
decrypted = privateKey.decrypt(encrypted, "RSA-OAEP");

// encrypt data with a public key using RSAES-OAEP/SHA-256
console.log("RSAES-OAEP/SHA-256 ");
encrypted = publicKey.encrypt(plaintext, "RSA-OAEP", {
  md: forge.md.sha256.create(),
});

console.log("Encrypted: " + forge.util.bytesToHex(encrypted));
decrypted = privateKey.decrypt(encrypted, "RSA-OAEP", {
  md: forge.md.sha256.create(),
  mgf1: {
    md: forge.md.sha1.create(),
  },
});

console.log("Decrypted: " + decrypted);
console.log();
// encrypt data with a public key using RSAES-OAEP/SHA-256/MGF1-SHA-1
// compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
console.log("RSAES-OAEP/SHA-256/MGF1-SHA-1 ");

// 51번 부터 보기!
// https://slidesplayer.org/slide/15368674/

plaintext = "Hello world hello world";
let pki = forge.pki;
rsa = forge.pki.rsa;

keypair = rsa.generateKeyPair({bits: 1024, e: 0x10001});
publicKey = keypair.publicKey;
privateKey = keypair.privateKey;

let pubPem = forge.pki.publicKeyToPem(publicKey);
let privPem = forge.pki.privateKeyToPem(privateKey);

console.log("Public key: \n" + pubPem);
console.log("Private key: \n" + privPem);
console.log();

// PEM에서 개인키 읽어오기
let privateKey1 = pki.privateKeyFromPem(privPem);
console.log("Pem to Private key: \n" + pki.privateKeyToPem(privateKey1));

// 개인키를 ASN.1으로 할당
let privAsn1 = pki.privateKeyToAsn1(privateKey);

// convert an ASN.1 PrivateKeyInfo or RSAPrivateKey to a Forge private key
privateKey2 = pki.privateKeyFromAsn1(privAsn1);
console.log("ASN.1 to Private key: \n" + pki.privateKeyToPem(privateKey2));

// ASN.1 개인키를 PrivateKeyInfo로 wrapping한 후에 pem으로 변환
// wrap an RSAPrivateKey ASN.1 object in a PKCS#8 ASN.1 PrivateKeyInfo
let privateKeyInfo = pki.wrapRsaPrivateKey(privAsn1);

// convert a PKCS#8 ASN.1 PrivateKeyInfo to PEM
pem = pki.privateKeyInfoToPem(privateKeyInfo);
console.log("Private key Info: \n" + pem);

// PrivateKeyInfo를 패스워드 암호화/복호화
// encrypts a PrivateKeyInfo and outputs an EncryptedPrivateKeyInfo
encryptedPrivateKeyInfo = pki.encryptPrivateKeyInfo(
  privateKeyInfo,
  "password",
  {
    algorithm: "aes256", // 'aes128', 'aes192', 'aes256', '3des'
  }
);

// decrypts an ASN.1 EncryptedPrivateKeyInfo
let privateKeyInfo1 = pki.decryptPrivateKeyInfo(
  encryptedPrivateKeyInfo,
  "password"
);
console.log(
  "Private key Info (enc/dec): \n" + pki.privateKeyInfoToPem(privateKeyInfo1)
);

// converts an EncryptedPrivateKeyInfo to PEM
pem = pki.encryptedPrivateKeyToPem(encryptedPrivateKeyInfo);
console.log("EncryptedPrivateKeyInfo 1: \n" + pem);

// converts a PEM-encoded EncryptedPrivateKeyInfo to ASN.1 format
let encryptedPrivateKeyInfo = pki.encryptedPrivateKeyFromPem(pem);

// wraps and encrypts a Forge private key and outputs it in PEM format
let pem = pki.encryptRsaPrivateKey(privateKey, "password");
console.log("EncryptedPrivateKeyInfo 2: \n" + pem);

// decrypts a PEM-formatted, encrypted private key
let privateKey2 = pki.decryptRsaPrivateKey(pem, "password");
console.log("Pem to Private key 2: \n" + pki.privateKeyToPem(privateKey2));

// sets an RSA public key from a private key
let publicKey1 = pki.setRsaPublicKey(privateKey.n, privateKey.e);
console.log("Public key from Private key: \n" + pki.publicKeyToPem(publicKey1));
