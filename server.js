var   express = require('express')
    , http = require('http')
    , path = require('path')
    , openfinLauncher = require('openfin-launcher');

var app = express();

app.set('title','OpenFin Notifications');
app.use(express.static(path.join(__dirname, 'src')));

/* serves main page  */
app.get('/', function (req, res) {
    res.sendFile("src/index.html", {"root": __dirname});
});

var port = 5050;

let localApp = http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
    openfinLauncher.launchOpenFin({
        configPath: `http://localhost:${port}/app.json`
    }).then(() => {
        localApp.close();
    });
});
