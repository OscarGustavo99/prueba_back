const { Schema, model } = require('mongoose')

const ActividadSchema = Schema({

    id_Admin:{
       type:Schema.Types.ObjectId,
       ref: 'Notificacion', //?
       require: true 
    },
    adminName:{
        type: String,
        ref: 'Notificacion',
        require: true 
    },
    account: {
        type: String,
        require: true
    },

    amount: {
        type: String,
        require: true
    },

    status: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    }
})

ActividadSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.uid = _id
    return object
})

module.exports = model('Actividad', ActividadSchema)

