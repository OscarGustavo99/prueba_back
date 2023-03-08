const { Schema, model } = require('mongoose')

const ActividadSchema = Schema({

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
    },
    notification: {
        type: Boolean,
        default: false
    },
}, {
    // Esto va adicional la fecha de creacion y ultima modificacion
    timestamps: true
})

ActividadSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.uid = _id
    return object
})

module.exports = model('Actividad', ActividadSchema)

