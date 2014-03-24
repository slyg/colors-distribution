   
    var 
        http = require('http'),
        express = require('express'),
        app = express.createServer(),
        ejs = require('ejs')
    ;
    
    app.set('view engine', 'ejs');
    
    app.use('/static', express.static(__dirname + '/static'));
    app.use(app.router); // avoid static treatment
    
    app.get('/', function(req, res){

        var target = req.query.target;

        render(target ? target : 'http://www.viadeo.com', res);
    });
    
    function render(target, res){
       
       if(target){
        
            http.request(
                {
                    host: 'www.colorfyit.com',
                    path: '/api/swatches/list.json?url=' + target + '&discover=true'
                },
                function(response) {
                    var str = '';
                    response.on('data', function (chunk) { str += chunk; });
                    response.on('end', function () {
                        res.render('colors', { data : JSON.parse(str).colors, target : target });
                    });
                }
            ).end();
        
        }
       
    }
        
    app.listen(process.env.PORT || 9000);