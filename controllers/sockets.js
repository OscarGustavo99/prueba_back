const Actividad = require("../models/actividades")

const getTableActivities = async() =>{
    const activides = await Actividad.find()
    return activides
}


const createActivities = async(data) =>{
    console.log(data)
    const createActivities = await Actividad(data)
    await createActivities.save()
    return createActivities
}

const selectRow = async(data) =>{
    const {uid} = data
    const activity = await Actividad.findById(uid)
    activity.status = 'PROCESO'
    await activity.save()
}

const selectRowDelete =  async(data)=>{
    const {uid} = data
    const activity = await Actividad.findById(uid)
    activity.status= 'PENDIENTE'
    await activity.save()
}


module.exports = {
    getTableActivities,
    createActivities,
    selectRowDelete,
    selectRow
}