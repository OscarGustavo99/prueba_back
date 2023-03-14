const { Schema, model } = require('mongoose')

const NotificationSchema =  Schema({
    
    de:{
        type:Schema.Types.ObjectId,
        ref: 'Actividad',
        require: true
    },

    name:{
        type: String,
        ref: 'Actividad',
        require: true
    },

    para:{
        type:Schema.Types.ObjectId,
        ref: 'Actividad',
        require:true
    },

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
