var io = require('socket.io');
var server = io.listen(4000 );
var osc = require("osc");
var imgCount = 0;
// var macbook_socket = undefined;

server.sockets.on('connection', function(socket) {
    socket.emit('helo', {
        msg: 'This is msg is by the server'
    });
    // socket.on('user', function(data) {
    //     if (data.type == "client") {
    //         //saving socket
    //         macbook_socket = socket;
    //     }
    // });

    socket.on('next', function(data) {
        // socket.broadcast.emit('button', {msg: 'Tasd'});
        server.sockets.emit('button', {
            msg: 'Tasd'
        });
        // if (democlientsocket != undefined) {
        //     democlientsocket.emit("next", {});
        // }           
    });

    socket.on("prev", function(data) {
        console.log("received prev");
        // if (democlientsocket != undefined) {
        //     democlientsocket.emit("prev", {});
        // }
    });
    socket.on("gyro", function(data) {
        server.sockets.emit('gyro_data', data);
        // console.log("gyro data");
        console.log(data);

    });
    socket.on("image", function(data) {
        var imgData = data.replace(/^data:image\/\w+;base64,/, "");
        var filename =__dirname + "/images/out_"+imgCount+".png";
        require("fs").writeFile( filename, imgData, 'base64', function(err) {
            console.log(err);
            server.sockets.emit('image_path', "out_"+imgCount+".png");
            console.log(filename);
            imgCount++;
        });        
    });
});



var getIPAddresses = function() {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121
});

udpPort.on("ready", function() {
    var ipAddresses = getIPAddresses();

    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function(address) {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
});

udpPort.on("message", function(oscMessage) {
    // example.mapOSCToSynth(oscMessage, example.synth, example.synthValueMap);
    console.log((oscMessage));
    server.sockets.emit('pos_data', oscMessage);
});

udpPort.on("error", function(err) {
    console.log(err);
});

udpPort.open();

// var app = require ('express')();
// var http = require ('http').Server(app);
// var io = require('socket.io')(http);


// app.get('/',function(req,res){
//  res.sendFile(__dirname+'/index.html');
// })

// io.on('connection',function(socket){
//  console.log('one user connected ' + socket.id); 

//  // socket.on('message',function(message){
//  //  console.log(message);
//  // })
// })

// http.listen(3000,function(){
//  console.log('server listening on port 3000')
// })
