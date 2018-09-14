var nem = require("nem-sdk").default;
async function hello(){
    console.log("Creating namespace")
var common = nem.model.objects.create("common")("","deae3310421b15d05bfc5eb000c2a237fc89a91452517c9411256aa114e9685e");
// var endpoint = nem.model.objects.create("endpoint")('http://23.228.67.85', nem.model.nodes.mijinPort);
var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
console.log("Creating namespace")
var tx = nem.model.objects.create("namespaceProvisionTransaction")("TestingNamespace", "");
console.log("Creating namespace")
//2- Prepare the tx
var entity =await nem.model.transactions.prepare("namespaceProvisionTransaction")(common, tx, nem.model.network.data.testnet.id);
console.log("Creating namespace",entity)
//3- Send
var sending=await nem.model.transactions.send(common, entity, endpoint);
console.log("sending=-============>",sending)

// Get namespaces owned by account
await nem.com.requests.account.namespaces.owned(endpoint, "TCYPZ4M5NJIVCYGHWAWEWS4ZI6SOA2K5YRXVONPC").then(function(res) {
	console.log("\nNamespaces of account:");
	console.log(res);
}, function(err) {
	console.error(err);
});
}
hello();