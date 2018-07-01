var fs = require('fs');

module.exports = function (app) {
	var path = require('path');

	app.route('/getText')
		.get(function(req, res, next) {
			var textpath = path.join(__dirname + '/../..', 'public/text', "glossary.txt")
			fs.readFile(textpath,  'utf-8', function(err, data) {
				if (err){
					console.log('Read Error', err);
				}

				console.log('READ data', data);
				res.json(data);
			});
		});

	app.route('/home')
		.get(function(req, res, next) {
			console.log('INSIDE HOME')
			res.sendFile(path.join(__dirname + '/../..', 'public', "index.html"));	
		});
}
