exports.go = function(server) {
    console.log("Server is working");

    const Primus = require('primus');
    let primus = new Primus(server, {});

    //primus.library();
    //primus.save(__dirname + '/primus.js');

    // start listening for connections
    primus.on('connection', (spark) => {
        console.log("Spark connected")

        // data event is emitted when a message is received from the client.
        spark.on('data', (data) => {
            primus.write(data); 
        })
    })
};