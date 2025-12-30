var http = require("http");
var { parse } = require("url");
var next = require("next");

var dev = false;
var app = next({ dev });
var handle = app.getRequestHandler();

app.prepare().then(() => {
  var server = http.createServer((req, res) => {
    var parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  var port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
