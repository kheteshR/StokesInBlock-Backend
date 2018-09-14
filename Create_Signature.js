// Include the library
var nem = require("nem-sdk").default;

const privateKey="19765d0b9f11616d8b851f5deaaae56ec451eae39727b4fdeb278e05a94c05b8";


// Create keypair
var kp = nem.crypto.keyPair.create(privateKey);

// Data to sign
var data = {
    "candiName":"name",
    "Seat_Number":"Seat_Number",
    "motherName":"motherName"
}
var jsondata=JSON.stringify(data)
// Sign data
var sig = kp.sign(jsondata);
// console.log("Sign Data===>",sig);

// Review
console.log("Public key: " + kp.publicKey.toString());
console.log("Original data: " + data);
console.log("Signature: " + sig.toString());
var response=sig.toString();
console.log("signature response",response)
