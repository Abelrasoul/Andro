const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
app.get('/', (req, res) => {

res.send('Chat Server is running on port 3000')
});
//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

io.on('connection', (socket) => {

console.log('user connected')
//???????????????????????????????????????????????????????????????????????????????
// ???????????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????????

    socket.on('join', function(userNickname) {

        console.log(userNickname +" : has joined the chat "  );

        socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
    });

//???????????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????????

socket.on('messagedetection', (imgstring) => {
       
       //log the message in console 

       console.log(imgstring)
        //create a message object 
       let  message = {"img":imgstring}
          // send the message to the client side  
       io.emit('message', message );
     
      });

//???????????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????????

    socket.on('resopnse', (n) =>
    {
        let  b = {"username":n.username,"lt":n.latitude,"ln":n.longitude,"Ress":n.RES}
       

       //log the message in console

       console.log(b)
        //create a message object
       //let  recieve = {"detail":n}
          // send the message to the client side
       io.emit('one', b);

      });
    //???????????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????????
//???????????????????????????????????????????????????????????????????????????????

    socket.on('on_connect', (d) =>
    {


        let  b = {"username":d.username,"lt":d.latitude,"ln":d.longitude}
        // send the message to the client side
        console.log(b)


        io.emit('catch', b);

      });
    socket.on('cancel', (n) =>
    {

       //log the message in console

       console.log(n)
        //create a message object
       let  recieve = {"detail":n}
          // send the message to the client side
       io.emit('two', recieve);

      });



 socket.on('disconnect', function() {
    console.log( ' user has left ')
    socket.broadcast.emit("userdisconnect"," user has left ") 

});



});





server.listen(3000,()=>{

console.log('Node app is running on port 3000 hhh');

});
