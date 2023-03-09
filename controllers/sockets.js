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

const createNotifications = async ({ description, notification }) => {
    try {
        const objectNotificacion = { description, notification }
        const notify = new Notificacion(objectNotificacion)
        await notify.save()

    } catch (err) {
        console.log(err)
    }
}

const getNotifications = async () =>{
    try{
        const activides = await Notificacion.find()
        return activides
    } catch (err) {
        console.log(err)
    }
}

const deletedNotifications = async (selectId) => {
    try{
        const notification = await Notificacion.findById(selectId)
        await notification.deleteOne({notification});
        return

    }catch(err){
        console.log(err)
    }    
}

const markAllAsRead = async (data)=>{
    try{

    }catch(err){
        console.log(err)
    }
}

const messageRead = async(messageId)=>{
    try{
        const idRead = await Notificacion.findById(messageId)
        idRead.notification = true
        await idRead.save()
    }catch(err){
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
    selectRowDelete,
    selectRow
}