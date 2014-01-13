var request = require('request'),
	cheerio = require('cheerio'),
	http = require('http'),
	fs = require('fs'),
	urls = [];
	var i = 0;
	
//check for date by selecting h1 with attr xmlns:dt="http://xsltsl.org/date-time"
//if there does not exist a directory in root with name of that date, create one
/*
var d = new Date();
var df = d.getFullYear()
    + ('0' + String(d.getMonth()+1)).substr(-2)
    + ('0' + String(d.getDate())).substr(-2);
alert(df);

fs.mkdir(week);
*/
//else return

	
	
request('http://docs.house.gov/floor/', function(err, resp, body){
	if(!err && resp.statusCode == 200){
		var $ = cheerio.load(body);
		$('a', '.floorItem').each(function(){
			var url = this.attr('href');
			var fileExt = url.substr(url.lastIndexOf('.')+1);
			if(fileExt == "pdf"){
			//trying to make more meaningful name with bill #
			var name = $(this).closest('.legisNum');
			var bill = $(name).text();
			console.log(bill);
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

