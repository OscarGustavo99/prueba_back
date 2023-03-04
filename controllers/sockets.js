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

module.exports = {
    getTableActivities,
    createActivities
}