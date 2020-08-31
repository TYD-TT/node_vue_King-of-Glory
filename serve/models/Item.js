const mongoose = require('mongoose')

const scheam = new mongoose.Schema({
    name: { type: String },
    icon: { type: String },

})

module.exports = mongoose.model('Item', scheam)