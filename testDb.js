var mongoose = require('mongoose');

var insert = function(){

var kittySchema = mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);
var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'
silence.save(function (err, silence) {
  if (err) return console.error(err);
  console.log('....ok');
});

}

module.exports.insert = insert;