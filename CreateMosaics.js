
// Include the library
var nem = require("nem-sdk").default;
 
new Promise(async (resolve, reject) => {
// Create an NIS endpoint object
var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation","7895");

// Create a common object holding key 
var common = nem.model.objects.create("common")("123", "757846b67c3412e5d04739aeb29b28bc89c1d359ffc4c40e1eef8f10e9579e88");
console.log("common====>",common)
// Get a MosaicDefinitionCreationTransaction object
var tx = nem.model.objects.get("mosaicDefinitionTransaction");
console.log("tx====>",tx)
// Define the mosaic
tx.mosaicName = "myMosaic";
tx.namespaceParent = {
	"fqn": "nano.example"
};
tx.mosaicDescription = "My mosaic for DMS";

// Set properties (see https://nemproject.github.io/#mosaicProperties)
tx.properties.initialSupply = 5000000;
tx.properties.divisibility = 2;
tx.properties.transferable = true;
tx.properties.supplyMutable = true;

// Prepare the transaction object
var transactionEntity =await nem.model.transactions.prepare("mosaicDefinitionTransaction")(common, tx, nem.model.network.data.mijin.id);
console.log("transactionEntity====>",transactionEntity)
// Serialize transaction and announce
var announce=await nem.model.transactions.send(common, transactionEntity, endpoint);

console.log("announce=======>",announce)
}).then((data)=>{
    console.log("data=========>",data)
}).catch(err=>{
    console.log(err)
});
