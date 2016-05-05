var Koa = require('koa');
var json = require('koa-json');
var serve = require('koa-static');
var app = new Koa();

app.use(json());
app.use(serve('public'));

app.listen(9000);

console.log('listening on port 9000');