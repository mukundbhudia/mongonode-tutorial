var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/userlist', function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(err, data){
		res.render('userlist', {
			"userlist" : data
		});
	});
});

module.exports = router;
