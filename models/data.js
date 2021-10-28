const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
})

const model = mongoose.model('dataModel',dataSchema)

module.exports = model
