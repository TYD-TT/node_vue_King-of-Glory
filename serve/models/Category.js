const mongoose = require('mongoose')

const scheam = new mongoose.Schema({
    name: { type: String },
    parent:{type:mongoose.SchemaTypes.ObjectId, ref:'Category'}
})

module.exports = mongoose.model('Category', scheam)