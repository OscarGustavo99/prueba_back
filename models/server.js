// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');

const {dbConnection} = require('../database/config');
const Sockets  = require('./sockets');
const cors = require('cors');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );

        // Conectar a BD
        dbConnection()
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );

        // Inizializar Sockets
        this.sockets = new Sockets(this.io)
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' )));
        
        //Parseo del body
        this.app.use(express.json());

        // TODO: CORS
        this.app.use(cors());

        // TODO: ENPOINTS
        this.app.use('/api/crear', require('../router/auth'))
        this.app.use('/api/obtener',require('../router/getActivities'))
        
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;