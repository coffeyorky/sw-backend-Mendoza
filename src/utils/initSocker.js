const messages = []

const initSocket = (io) =>{

    io.on('connection', socket => { 
        console.log('Nuevo cliente conectado')
    
        socket.on('message', objetoMensajeCliente => {
            console.log(objetoMensajeCliente)
            messages.push(objetoMensajeCliente)
    
            io.emit('messageLogs', messages)
        })

        socket.on('authenticated', nombreUsuario=>{
            socket.broadcast.emit('newUserConnected',nombreUsuario);
        })
    })
}

module.exports = {
    initSocket
}
