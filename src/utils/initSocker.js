const { logger } = require("./logger")

const messages = []

const initSocket = (io) =>{

    io.on('connection', socket => { 
        logger.info('Nuevo cliente conectado')
    
        socket.on('message', objetoMensajeCliente => {
            logger.info(objetoMensajeCliente)
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
