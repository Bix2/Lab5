exports.go = function(server) {
    console.log("Server is working");

    const Primus = require('primus');
    let primus = new Primus(server, {});

    primus.library();
    primus.save(__dirname + '/primus.js');
}