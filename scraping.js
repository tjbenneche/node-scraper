var request = require('request'),
	cheerio = require('cheerio'),
	http = require('http'),
	fs = require('fs'),
	urls = [],
	i = 0;
	
//check for date by selecting h1 with attr xmlns:dt="http://xsltsl.org/date-time"
//if there does not exist a directory in root with name of that date, create one




//else return

	
	
request('http://docs.house.gov/floor/', function(err, resp, body){
	if(!err && resp.statusCode == 200){
		var $ = cheerio.load(body);
		
		var title = $("#primaryContent > h1").text();
		//var name = $(title).toString();
		var spans = $('.lastUpdated').toString();
		var extraText = 'Text of Bills for the Week of';
		var h1close = '</h1>';
		var week = title.replace(spans,'');
		week.replace(extraText, '');
		week.replace(h1close, '');
		week = './' + week;
		console.log(week);

		fs.mkdir(week, "0777");
		
		$('a', '.floorItem').each(function(){
			var url = this.attr('href');
			var fileExt = url.substr(url.lastIndexOf('.')+1);
			if(fileExt == "pdf"){
			//trying to make more meaningful name with bill #
			var name = $(this).closest("tr");
			var bill = $(name).find("td:first-child");
			var billText = $(bill).text();
			console.log(billText);
			var file = fs.createWriteStream(billText + ".pdf")
			var request = http.get(url, function(response) {
			  response.pipe(file);
			});
		}
			urls.push(url);
		});
		console.log(urls);
	}
});

