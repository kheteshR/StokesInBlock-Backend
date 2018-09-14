// Include the library
var nem = require("nem-sdk").default;

async function hello(){
    try{
// Create an NIS endpoint object
var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
console.log(endpoint)
var privatekey="ccc65c7354d58fc53ded61021aec310091c69e5c881d534505fba6c1fbe0cbfa";
// Create a common object holding key 
var common = await nem.model.objects.create("common")("123", privatekey);
console.log("common=============>",common)

// Get a MosaicDefinitionCreationTransaction object
var tx =await nem.model.objects.get("mosaicDefinitionTransaction");
console.log("tx==========>",tx)


// Define the mosaic
tx.mosaicName = "swetahome";
tx.namespaceParent = {
	"fqn": "governmentcom"
};
console.log("namespace=============>",tx.namespaceParent)

tx.mosaicDescription = "My mosaic";
console.log(tx)
// Set properties (see https://nemproject.github.io/#mosaicProperties)
tx.properties.initialSupply =50;
tx.properties.divisibility = 0;
tx.properties.transferable = true;
tx.properties.supplyMutable = true;

// Prepare the transaction object
var transactionEntity =await nem.model.transactions.prepare("mosaicDefinitionTransaction")(common, tx, nem.model.network.data.testnet.id);
console.log("transactionEntity==========>",transactionEntity)
console.log("common, transactionEntity, endpoint=============>",common, transactionEntity, endpoint)
// Serialize transaction and announce
var send=await nem.model.transactions.send(common, transactionEntity, endpoint)
console.log("send=============>",send)
}
catch(err) {
    console.log(err)
}
}


hello();