var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ extended: false });
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var uristring = 'mongodb://localhost:27017/appointus';
var Client = require('./models/clients');

mongoose.connect(uristring, { useNewUrlParser: true }, function(err) {
	if (err) {
		console.log(err);
	}
});
app.put('/clients/:id', jsonParser, function(req, res) {
	Client.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				first_name: req.body.new_first_name,
				last_name: req.body.new_last_name,
				phone: req.body.new_phone
			}
		},
		{ new: true },
		function(err, doc) {
			if (err) console.log(err);
			res.send(doc);
		}
	);
});
app.get('/clients', jsonParser, function(req, res) {
	Client.find(function(err, clients) {
		if (err) return console.error(err);
		res.send(clients);
	});
});

app.post('/clients', jsonParser, function(req, res) {
	var clientToAdd = new Client({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone: req.body.phone
	});
	clientToAdd.save(function(err, client) {
		if (err) console.log('Error on save!');
		res.send(client);
	});
});

app.listen(3000);
