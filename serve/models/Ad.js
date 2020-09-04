const mongoose = require('mongoose')

const scheam = new mongoose.Schema({
    name: { type: String },
    items: [{
            image: { type: String },
            url: { type: String }
        }]
})

module.exports = mongoose.model('Ad', scheam)