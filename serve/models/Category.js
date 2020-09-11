const mongoose = require('mongoose')

const scheam = new mongoose.Schema({
    name: { type: String },
    parent:{type:mongoose.SchemaTypes.ObjectId, ref:'Category'}
})

scheam.virtual('children',{
    localField:'_id',
    foreignField:'parent',
    justOne:false,
    ref:'Category'
})

scheam.virtual('newsList',{
    localField:'_id',
    foreignField:'categories',
    justOne:false,
    ref:'Article'
})

module.exports = mongoose.model('Category', scheam)