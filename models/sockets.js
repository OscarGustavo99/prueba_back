

class Sockets {

    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            // Escuchar evento: mensaje-to-server
            socket.on('mensaje-to-server', ( data ) => {
                console.log( data );
                this.io.emit('mensaje-from-server', data );
            });


            socket.join(uid)
            
        
        });
    }


}


module.exports = Sockets;