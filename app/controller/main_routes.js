var fs = require('fs');
var beautify = require('js-beautify').js_beautify

module.exports = function (app) {
	var path = require('path');

	app.route('/getText')
		.get(function(req, res, next) {
			var textpath = path.join(__dirname + '/../..', 'public/text', "glossary.txt")
			fs.readFile(textpath,  'utf-8', function(err, data) {
				if (err){
					console.log('Read Error', err);
				}
				console.log('BEUTIFY', beautify(data, {indent_size: 4}));
				res.json(data);
			});
		});

	app.route('/home')
		.get(function(req, res, next) {
			res.sendFile(path.join(__dirname + '/../..', 'public', "index.html"));	
		});
}

