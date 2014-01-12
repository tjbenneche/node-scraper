var request = require('request'),
	cheerio = require('cheerio'),
	http = require('http'),
	fs = require('fs'),
	urls = [];
	var i = 0;
	
	
	
request('http://docs.house.gov/floor/', function(err, resp, body){
	if(!err && resp.statusCode == 200){
		var $ = cheerio.load(body);
		$('a', '.floorItem').each(function(){
			var url = this.attr('href');
			var fileExt = url.substr(url.lastIndexOf('.')+1);
			if(fileExt == "pdf"){
			var file = fs.createWriteStream(i + ".pdf")
			var request = http.get(url, function(response) {
			  response.pipe(file);
			});
			i++;
		}
			urls.push(url);
		});
		console.log(urls);
	}
});