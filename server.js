    
    var 
		http = require('http'),
        express = require('express'),
		app = express.createServer(),
        ejs = require('ejs')
	;
	
    app.set('view engine', 'ejs');
    
    app.use("/static", express.static(__dirname + '/static'));
    
	app.get('/', function(req, res){
	
		http.request(
            {
	  			host: 'www.colorfyit.com',
	  			//path: '/api/swatches/list.json?url=www.viadeo.com%2Fgroups%2F%3FcontainerId=0021&discover=true'
                path: '/api/swatches/list.json?url=www.viadeo.com&discover=true'
			},
			function(response) {
				var str = '';
		  		response.on('data', function (chunk) { str += chunk; });
		  		response.on('end', function () {
                    res.render('colors', {
                        datas : JSON.parse(str).colors
                    });
    	  		});
	  		}
		).end();
    
	});
	
	app.listen(process.env.PORT);
    