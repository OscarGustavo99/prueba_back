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

    constructor(io) {
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
            socket.on('sala-Usuarios', async (id) => {
                socket.join('notifications-user')
                console.log(`El usuario ${id}: se conecto a la sala de notificaciones`)

                if (socket.rooms.has('control')) {
                    this.io.to('notifications-user').emit('tableNotifications_User', await getNotifications(id))
                }



                //TODO: PENDIENTE ELIMINAR
                socket.on('deletedNotification', async (data) => {
                    await deletedNotifications(data)
                    if (socket.rooms.has('control')) {
                        this.io.to('notifications-user').emit('tableNotifications_User', await getNotifications(id))
                    }
                });
            })

            //TODO: DETALLE CON NOTIFICACIONES PRIMER PASO
            socket.on('getTables', async () => {
                console.log('SE ACTIVDA')
                this.io.emit('tableActivities', await getTableActivities())

                if (socket.rooms.has('control')) {
                    this.io.to('notifications-user').emit('activar_notificacion')
                }
            });

            //? ACTUALIZA LA TABLA
            socket.on('sendIdDemo', async (id_user) => {
                if (socket.rooms.has('control')) {
                    this.io.to('notifications-user').emit('tableNotifications_User', await getNotifications(id_user))
                }
            })



            socket.on('sendActivity', async (data, newArray) => {

                await createActivities(data);
                const newModelUser = newArray.map((item) => ({
                    ...data,
                    id_User: item.id
                }))

                await newModelUser.map((data) => {
                    createNotifications(data)
                })

                if (socket.rooms.has('control')) {
                    this.io.emit('activar_notificacion')
                }
                console.log('SE ACTIVDA enviar')
                this.io.emit('tableActivities', await getTableActivities())

            });



            socket.on('selectRow', async (data) => {
                await selectRow(data);
                this.io.emit('tableActivities', await getTableActivities())
            });

            socket.on('deletetRow', async (data) => {
                await selectRowDelete(data);
                this.io.emit('tableActivities', await getTableActivities())
            });

            socket.on('messageRead', async (data) => {
                await messageRead(data)
                if (socket.rooms.has('control')) {

                    // this.io.to('notifications-user').emit('tableNotifications', await getNotifications())
                }
            });

            //TODO: PENDIENTE
            socket.on('markAllAsRead', async (data) => {
                await markAllAsRead(data)
                // this.io.emit('tableNotifications', await getNotifications())
            })


        });
    }


}


module.exports = Sockets;