

    // TCP server
    var net = require('net');
    let ENQ = String.fromCharCode(0x05);
    let EOT = String.fromCharCode(0x04);
    let ACK = String.fromCharCode(0x06);
    let NAK = String.fromCharCode(0x15);
    var VT = String.fromCharCode(0x0b);
    var FS = String.fromCharCode(0x1c);
    var CR = String.fromCharCode(0x0d);
  
    net.createServer(function (socket) {
      
      let self = this;
      this.message = '';
      let remmotePort = socket.remotePort
      let count = 1
        


      // ? Who connected
      console.log('socket connected - remote address : '+socket.remoteAddress +':'+ remmotePort)
      
      setTimeout(()=>{socket.emit('data',ENQ)},5000)
      // setInterval(()=>{socket.emit('data',ACK)},5000)
      socket.on('hl7', (data) => {
        console.log('received payload:', data);
       });
       
      socket.on('data', function(data) {
        var line = data.toLocaleString();
        
          console.log(line)

       if(line == ENQ ){
       setTimeout(()=>{socket.emit('data',ACK)},5000)  
       } 


        // if(line == ENQ && count == 2){
        //   socket.emit('data',king)
        //   socket.emit('data',EOT)
        //   count = 1
        //   } 
  
  
      });

      socket.on('end', function() {
        console.log('end');
      });
      socket.on('close', function() {
        console.log('close');
      });
      socket.on('error', function(e) {
        console.log('error ', e);
      });
    }).listen(8888, function() {
      console.log('Server listening on port 8888');
    });