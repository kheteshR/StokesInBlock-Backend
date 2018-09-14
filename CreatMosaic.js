// Include the library
var nem = require("nem-sdk").default;

 function hello(){
// Create an NIS endpoint object
var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", nem.model.nodes.defaultPort);

// Create a common object holding key 
var common = nem.model.objects.create("common")("123", "dc1505c6b93d3cea132270294abbb9b1465ef2209853c385b31c65da3ac3bb75");

// Get a MosaicDefinitionCreationTransaction object
var tx = nem.model.objects.get("mosaicDefinitionTransaction");
console.log("tx=====>",tx)
// Define the mosaic
tx.mosaicName = "myMosaic";
tx.namespaceParent = {
	"fqn": "RapidQube.com"
};
tx.mosaicDescription = "My mosaic";

// Set properties (see https://nemproject.github.io/#mosaicProperties)
tx.properties.initialSupply = 5000000;
tx.properties.divisibility = 2;
tx.properties.transferable = true;
tx.properties.supplyMutable = true;

// Prepare the transaction object
var transactionEntity = nem.model.transactions.prepare("mosaicDefinitionTransaction")(common, tx, nem.model.network.data.mijin.id);
console.log("transactionEntity",transactionEntity)
// Serialize transaction and announce
nem.model.transactions.send(common, transactionEntity, endpoint)
}
hello()