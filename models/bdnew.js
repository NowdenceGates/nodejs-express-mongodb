var mongoose = require('mongoose');
var BdnewSchema = require('../schemas/bdnew');
var Bdnew = mongoose.model('Bdnew', BdnewSchema);

module.exports = Bdnew;