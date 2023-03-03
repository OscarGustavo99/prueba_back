const { response } = require("express")
// const Actividad = require("../models/actividades")
const Actividad = require("../models/actividades")

const CrearActividad = async(req, res = response) =>{

    try{
        const actividad = new Actividad(req.body)
        await actividad.save()
        
        res.json({
            ok:true,
            actividad
        })
        return actividad

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    CrearActividad
}