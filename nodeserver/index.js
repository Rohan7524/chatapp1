

const io = require("socket.io")(8000);
// var cors = require('cors')
// app.use(cors())

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined', name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);

    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('receive',users[socket.id]);
        delete users[socket.id]
    })

})