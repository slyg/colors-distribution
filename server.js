   
	var 
		http = require('http'),
		express = require('express'),
		app = express.createServer(),
		ejs = require('ejs')
	;
	
	app.set('view engine', 'ejs');
	
	app.use("/static", express.static(__dirname + '/static'));
    app.use(app.router); // avoid static treatment
	
	app.get('/:target', function(req, res){
        
        var target =  req.params.target;
        
        if(target){
        
    		http.request(
    			{
    				host: 'www.colorfyit.com',
    				path: '/api/swatches/list.json?url=www.' + target + '.com&discover=true'
    			},
    			function(response) {
    				var str = '';
    				response.on('data', function (chunk) { str += chunk; });
    				response.on('end', function () {
    					res.render('colors', { datas : JSON.parse(str).colors, target : target });
    				});
    			}
    		).end();
        
        }
	
	});
		
	app.listen(process.env.PORT);