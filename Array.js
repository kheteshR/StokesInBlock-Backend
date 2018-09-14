var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
var arr2 = ['cat1','cat2','cat3','cat4'];
console.log(arr2)
var s = arr2.join(",");
console.log("====>>",s);
var i = arr2[Math.floor(Math.random()*arr2.length)];
console.log("random=======>>",i);

console.log("Math random=======>>",Math.floor(Math.random()*arr2.length));
var stringify="fhsjfhjshfjsdfsfdsfdsd";
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(stringify, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
    });
});