// https://www.npmjs.com/package/ssri#parse

const ssri = require("ssri");

ssri.parse(sri, [opts]); // -> Integrity
ssri.stringify(sri, [opts]); // -> String

Integrity.concat(otherIntegrity, [opts]); // -> Integrity
Integrity.merge(otherIntegrity, [opts]);

Integrity.toString([opts]); // -> String
Integrity.toJSON(); // -> String

Integrity.match(sri, [opts]); // -> Hash | false
Integrity.pickAlgorithm([opts]); // -> String
Integrity.hexDigest(); // -> String
ssri.fromHex(hexDigest, algorithm, [opts]); // -> Integrity
ssri.fromData(data, [opts]); // -> Integrity
ssri.fromStream(stream, [opts]); // -> Promise<Integrity>
ssri.create([opts]); // -> <Hash>
ssri.checkData(data, sri, [opts]); // -> Hash|false
ssri.checkStream(stream, sri, [opts]); // -> Promise<Hash>
integrityStream([opts]); // -> IntegrityStream
