const Actividad = require("../models/actividades")
const Notificacion = require("../models/notifications")

const getTableActivities = async () => {
    try {
        const activides = await Actividad.find()
        return activides

    } catch (err) {
        console.log(err)
    }
}


const createActivities = async (data) => {
    try {
        const createActivities = await Actividad(data)
        await createActivities.save()
        return createActivities

    } catch (err) {
        console.log(err)
    }
}

const createNotifications = async ({ id_Admin,id_User,adminName, description, notification }) => {
    try {
        const objectNotificacion = {
            de: id_Admin,
            para: id_User,
            name: adminName,
            description,
            notification
        }
        const notify = new Notificacion(objectNotificacion)
        await notify.save()

    } catch (err) {
        console.log(err)
    }
}

const getNotifications = async (id) => {
    try {
        const activities = await Notificacion.find(
                {para:id,notification:false }
            )
        return activities
    } catch (err) {
        console.log(err)
    }
}

const deletedNotifications = async (selectId) => {
    console.log(selectId)
    try {
        await Notificacion.deleteOne({ _id: selectId });
        return

    } catch (err) {
        console.log(err)
    }
}

const markAllAsRead = async (newArray) => {
    // console.log('Valor:',newArray)
    try {
        if (newArray.length !== 0) {
            await Notificacion.updateMany(
                { _id: { $in: newArray.map(u => u.uid) } },
                { notification: true }
            )
            return Notificacion
        }
    } catch (err) {

        console.log(err)
    }
}

const messageRead = async (messageId) => {
    try {
        if (messageId !== null) {
            await Notificacion?.findOneAndUpdate(
                { _id: messageId },
                { $set: { notification: true } },
                { new: true },
            )

        }
        return

    } catch (err) {
        console.log(err)
    }
}

const selectRow = async (data) => {
    try {
        const { uid } = data
        const activity = await Actividad.findById(uid)
        activity.status = 'PROCESO'
        await activity.save()

    } catch (err) {
        console.log(err)
    }
}

const selectRowDelete = async (data) => {
    try {
        const { uid } = data
        const activity = await Actividad.findById(uid)
        activity.status = 'PENDIENTE'
        await activity.save()

    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getTableActivities,
    getNotifications,
    createNotifications,
    createActivities,
    deletedNotifications,
    messageRead,
    markAllAsRead,
    selectRowDelete,
    selectRow
}