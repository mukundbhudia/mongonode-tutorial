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

router.get('/newuser', function(req, res){
	res.render('newuser', {title: 'Add a new user'});
});

router.post('/adduser', function(req, res){
	var db = req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//Get the db collection
	var collection = db.get('usercollection');

	//Access the database to add the user data
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function(err, data){
		if (err) {
			console.log(err);
			res.send("An error accessing the database has occured. Please try again.");
		} else {
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});

module.exports = router;
