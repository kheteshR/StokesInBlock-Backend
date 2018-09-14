var nem = require("nem-sdk").default;
var publicKey="ba42765ebfa181502fa59b72b8d0ab8eb9656ef3dc7f2d9151cefc6556ec83a4"
var networkId="96"
var address = nem.model.address.toAddress(publicKey, networkId)
console.log("Address==========>>>>>",address)
// Set a wallet name
var walletName = "T";

// Set a password/passphrase


// Create Brain wallet
var wallet = nem.model.wallet.createBrain(walletName, "123", networkId);
console.log(wallet)