const router = require('express').Router();
var Client = require('../models/clients');

router.get('/clients', function(req, res) {
  Client.find(function(err, clients) {
    if (err) return console.error(err);
    res.send(clients);
  });
});

router.post('/clients', function(req, res) {
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

module.exports = router;
