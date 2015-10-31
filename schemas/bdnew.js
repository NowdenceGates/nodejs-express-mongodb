var mongoose = require('mongoose');

var BdnewSchema = new mongoose.Schema({
	newstitle: String,
	newscontent: String,
	newscat: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

BdnewSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else {
		this.meta.updateAt = Date.now();
	}

	next();
});

BdnewSchema.statics = {
	fetch: function(cb) {
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
	},
	findById: function(id, cb) {
		return this
		.findOne({_id: id})
		.exec(cb)
	},
	findByNewscat: function(newscat, cb){
		return this
		.find({newscat: newscat})
		.exec(cb)
	}
}

module.exports = BdnewSchema;