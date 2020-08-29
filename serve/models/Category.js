const mongoose = require('mongoose')

const scheam = new mongoose.Schema({
    name: { type: String }
})

module.exports = mongoose.model('Category', scheam)