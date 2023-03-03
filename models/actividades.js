const { Schema, model } = require('mongoose')

const ActividadSchema = Schema({

    cuenta:{
        type: Number,
        
        // required:true
    },

    monto:{
        type: Number,
        // required:true
    },

    status:{
        type: String,
        // required:true
    },

    descripcion:{
        typeof: String,
        // required: true
    }
})

ActividadSchema.method('toJSON', function (){
    const {__v, _id, ...object} = this.toObject()
    object.uid = _id
    return object
})

module.exports = model('Actividad', ActividadSchema)

