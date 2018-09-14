// Include the library
var nem = require("nem-sdk").default;

// Create keypair
var kp = nem.crypto.keyPair.create("dc1505c6b93d3cea132270294abbb9b1465ef2209853c385b31c65da3ac3bb75");
// console.log("keypair==========>",kp)
// Data to sign
var data = "RapidQube!!!!!!!!sfsfsfsfsfsfsfsf!!!!!!!!!!!!!!!!!!!!!!!"
console.log("data==========>",data);
var signature="29469f02ec72b5c9bc18ef6e442fa078882a1797873b24495a210f5e6cf99653b0510ca8ec56c75ce7ff01eac8ad8268c353fb18850b6aeb065b977a99c32109"
// Sign data
var sig = kp.sign(data);
// console.log("sig==========>",sig)

// Review
console.log("Public key: " + kp.publicKey.toString());
console.log("Original data: " + data);
console.log("Signature: " + sig.toString());
if(sig.toString()==signature.toString()){
    console.log("same signature")
}else{
    console.log("not same signature")
}

// Result
console.log("\nResult: ");
if(nem.crypto.verifySignature(kp.publicKey.toString(), data, sig.toString())) {
	console.log("Signature is valid");
} else {
	console.log("Signature is invalid");
}