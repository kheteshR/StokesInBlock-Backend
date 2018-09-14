var nem = require("nem-sdk").default;

// Create an NIS endpoint object
var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", nem.model.nodes.mijinPort);


// var searchEnabledEndpoint = nem.model.objects.create("endpoint")(nem.model.nodes.searchOnMijin[0].uri, nem.model.nodes.defaultPort);

var AllTransaction=nem.com.requests.transaction.byHash(endpoint,"31df4416a6077278faf222023d5b5ffcfc4c8b26262a7a8a621f994fcde3bedc").then(function(res) {

      console.log(res.transaction.message.payload)
      var fmt = nem.utils.format.hexToUtf8(res.transaction.message.payload);
      console.log(fmt)
   

  
})
