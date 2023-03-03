const Actividad = require("../models/actividades")

const getActivities = async(req, res) => {

    try{
        const activities = await Actividad.find()
        res.json({
            ok:true,
            activities
        })
        return activities

    } catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getActivities
}