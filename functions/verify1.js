'use strict'

const upload = require('../models/uploaded');

exports.verifydoc = (hash) =>{
    return new Promise((resolve, reject ) =>{
console.log("LAKLJSL>>>...",hash)
const h = ""+hash;
        upload.find({"filesHash.hash":h}).then(result =>{
            console.log("db data", result )
            resolve({
                status: 200,
                message: "success",
                output : result

            });
        })
    })

}