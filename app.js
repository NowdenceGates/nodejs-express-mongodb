var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Bdnew = require('./models/bdnew');
var app = express();
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/jikestudy');

app.set('views','./views/admin');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('jikestudy started on port ' + port);

//index page
app.get('/', function(req,res){
	Bdnew.fetch(function(err, bdnews) {
		if(err) {
			console.log(err);
		}

		res.render('../index', {
			title: '百度新闻首页',
			bdnews: bdnews
		});
	});
});

//index news selected
app.get('/newscat/:newscatforcur', function(req,res){
	var newscatforcur = req.params.newscatforcur
	var newscat = newscatforcur
	Bdnew.findByNewscat(newscat, function(err, bdnews) {
		if(err) {
			console.log(err)
		}

		res.render('../index', {
			title: newscat+'-百度新闻首页',
			bdnews: bdnews
		});
	});
});
//admin index page
app.get('/admin', function(req,res){
	Bdnew.fetch(function(err, bdnews) {
		if(err) {
			console.log(err);
		}

		res.render('index', {
			title: '百度新闻管理后台首页',
			bdnews: bdnews
		});
	});
});

//detail page
app.get('/bdnew/:id', function(req,res){
	var id = req.params.id

	Bdnew.findById(id, function(err, bdnew){
		res.render('detail', {
			title: '百度新闻-' + bdnew.newstitle,
			bdnew: bdnew
		});
	});	
});

//admin update bdnew
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id;

	if(id){
		Bdnew.findById(id, function(err, bdnew){
			res.render('admin',{
				title: '百度新闻-后台更新页',
				bdnew: bdnew
			});
		});
	}
});

//admin post bdnew
app.post('/admin/bdnew/new', function(req, res){
	var id = req.body.bdnew._id;
	var bdnewObj = req.body.bdnew;
	var _bdnew;

	if(id !== 'undefined') {
		Bdnew.findById(id, function(err, bdnew) {
			if (err) {
				console.log(err);
			}

			_bdnew = _.extend(bdnew, bdnewObj)
			_bdnew.save(function(err,bdnew) {
				if(err){
					console.log(err);
				}

				res.redirect('/bdnew/' + bdnew._id);
			});
		});
	}
	else {
		_bdnew = new Bdnew({
			newstitle: bdnewObj.newstitle,
			newscontent: bdnewObj.newscontent,
			newscat: bdnewObj.newscat
		});

		_bdnew.save(function(err, bdnew){
			if(err){
					console.log(err);
				}

			res.redirect('/bdnew/' + bdnew._id);
		});
	}
});

//admin page
app.get('/admin/bdnew', function(req,res){
	res.render('admin',{
		title:'百度新闻-后台录入页',
		bdnew: {
			newstitle:'',
			newscontent:'',
			newscat:''
		}
	});
});

//list page 缩略图
app.get('/admin/list', function(req,res){
	Bdnew.fetch(function(err, bdnews){
		if(err){
			console.log(err)
		}
		res.render('list', {
			title:'百度新闻-列表页',
			bdnews: bdnews
		});
	});
});

// list delete bdnew
app.delete('/admin/list', function(req, res){
	var id = req.query.id;
	console.log(id);
	if (id) {
		Bdnew.remove({_id:id}, function(err, bdnew) {
			if (err) {
				console.log(err);
			}
			else {
				res.json({success: 1});
			}
		});
	}
});