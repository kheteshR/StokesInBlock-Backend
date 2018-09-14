// Include the library
var nem = require("nem-sdk").default;

  var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
  console.log(endpoint)
  let networkId = nem.model.network.data.testnet.id;
  console.log("networkId",networkId)
  let privateKeyOfAccountToConvert = "6de6bf8369908fcd4fc85619f15e5ff0defe69f7ef3886944ebf0c7c57625516";  //TARN5LX3LQPYSGCZNASBSU662MZ2ZGWTQUUQ34WU multisig account private key
  let privateKeyOfCosig = "fefc23f299f711f70407298177fee6a7fb1ec48a3fb2c57930937f3624e573dc";
//   consigner=TA4M4ZKAKOXDSTAV33BFXMWJCSS62M7WDXKWUN76
  let kpc = nem.crypto.keyPair.create(privateKeyOfAccountToConvert);
//   console.log("kpc===========>",kpc);
let kps = nem.crypto.keyPair.create(privateKeyOfCosig);
//   console.log("kps===========>",kps);
  
let addressToMakeMultisig = nem.model.address.toAddress(kpc.publicKey.toString(), networkId); 
let addressCoSigner = nem.model.address.toAddress(kps.publicKey.toString(), networkId);
  
  console.log("Address to Convert to Multisig: " + addressToMakeMultisig); // TBKFYXLDLVMDZ76AU5EKVE7IA55BDXIV74FQSOCK
  console.log("Address as single Co-Signer   : " + addressCoSigner); // TA3SH7QUTG6OS4EGHSES426552FAJYZR2PHOBLNA
  
  // We make `addressToMakeMultisig` a 1-of-1 multisig with the only
  // cosigner being the `kp` account
  
  // type 1 = Add cosigner
  const modification = nem.model.objects.create("multisigCosignatoryModification")(1, kps.publicKey.toString());
  
  // prepare transaction
  const trx = nem.model.objects.create('multisigAggregateModification')();
  trx.modifications.push(modification);
  trx.relativeChange = 1;
  
  // wrap transaction
  const creds = {password: '123', privateKey: privateKeyOfAccountToConvert};
  const prepared = nem.model.transactions.prepare('multisigAggregateModificationTransaction')(creds, trx, networkId);
  
  console.log(trx);
  console.log(prepared);
  
  // async broadcast of the transaction
  (async function broadcast() {
      console.log("]]]]]]]]]]]]]]]",creds, prepared,endpoint)
      let result = await nem.model.transactions.send(creds, prepared,endpoint);
      console.log(".................",result);
  })().catch(err=>{
      console.log("this is error......>",err);
  });