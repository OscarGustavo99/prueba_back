const { 
    getTableActivities, 
    createActivities, 
    selectRow, 
    selectRowDelete,
    createNotifications, 
    getNotifications, 
    deletedNotifications,
    messageRead,
    markAllAsRead
} = require("../controllers/sockets");

class Sockets {

    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            console.log('Cliente Conectadoo')
            
            //* SE UNE EL ADMINISTRADOR
            socket.join('control') 

            //* SALA DE LOS USUARIOS
            socket.on('sala-Usuarios',(id)=>{
                socket.join('notifications-user')
                console.log(`El usuario ${id}: se conecto a la sala de notificaciones`)
            })

        
            socket.on('getTables', async()=>{
                this.io.emit('tableActivities', await getTableActivities())
                if(socket.rooms.has('control')){
                    this.io.to('notifications-user').emit('tableNotifications',await getNotifications())
                }
            });

            socket.on('sendActivity', async(data)=>{
                const newActivity = await createActivities(data);
                await createNotifications(newActivity);
                
                if(socket.rooms.has('control')){
                    this.io.to('notifications-user').emit('tableNotifications',await getNotifications())
                }

                this.io.emit('tableActivities', await getTableActivities())

            });

            socket.on('deletedNotification', async (data)=>{
                await deletedNotifications(data)
                this.io.emit('tableNotifications',await getNotifications())
            });

            socket.on('selectRow', async(data)=>{
                await selectRow(data);
                this.io.emit('tableActivities', await getTableActivities())
            });

            socket.on('deletetRow', async(data)=>{
                await selectRowDelete(data);
                this.io.emit('tableActivities', await getTableActivities())
            });

            socket.on('messageRead', async(data)=>{
                await messageRead(data)
                this.io.emit('tableNotifications', await getNotifications())
            });

            //TODO: PENDIENTE
            socket.on('markAllAsRead', async(data)=>{
                await markAllAsRead(data) 
                this.io.emit('tableNotifications', await getNotifications())
            })
      

        });
    }


}


module.exports = Sockets;