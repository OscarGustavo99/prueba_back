const { Schema, model } = require('mongoose')

const NotificationSchema =  Schema({
    
    description: {
        type: String,
        ref:'Actividad',
        require: true
    },

    notification: {
        type: Boolean,
        default: false
    },
},{
    // Esto va adicional la fecha de creacion y ultima modificacion
    timestamps: true
})

NotificationSchema.method('toJSON',function(){
    const {__v, _id, ...object} = this.toObject()
    object.uid = _id
    return object
})

module.exports =  model('Notificacion', NotificationSchema)
