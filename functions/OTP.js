router.post('/newLogin', cors(), (req, res) => {
var phonetosend = req.body.phone;

var otp = "";
var possible = "0123456789";
for (var i = 0; i < 4; i++)
    otp += possible.charAt(Math.floor(Math.random() * possible.length));
console.log("otp" + otp);

var otptosend = 'your otp is ' + otp;

if (!phonetosend) {

    res
        .status(400)
        .json({
            message: 'Invalid Request !'
        });

} else {

    newlogin
        .newlogin(phonetosend, otp)
        .then(result => {

            const token = jwt.sign(result, config.secret, {
                expiresIn: 60000
            })

            nexmo
                .message
                .sendSms('919768135452', phonetosend, otptosend, {
                    type: 'unicode'
                }, (err, responseData) => {
                    if (responseData) {
                        console.log(responseData)
                    }
                });
            res
                .status(result.status)
                .json({
                    message: result.message,
                    token:token,
                    otp: result.otp
                });

        })
        .catch(err => res.status(err.status).json({
            message: err.message
        }).json({
            status: err.status
        }));
}
});