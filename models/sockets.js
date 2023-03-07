const { getTableActivities, createActivities, selectRow } = require("../controllers/sockets");

class Sockets {

    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            console.log('Cliente Conectadoo')

            socket.on('activities',(data)=>{
                console.log(data)
            })

            // this.io.emit('tableActivities', await getTableActivities())

            socket.on('message', async(data)=>{
                await createActivities(data)
                this.io.emit('tableActivities', await getTableActivities())

            })

            socket.on('getTables', async()=>{
                this.io.emit('tableActivities', await getTableActivities())
            })

            socket.on('selectRow', async(data)=>{
                await selectRow(data)
                this.io.emit('tableActivities', await getTableActivities())
            })

      

        });
    }


}


module.exports = Sockets;