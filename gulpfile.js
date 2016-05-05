
var elixir = require('laravel-elixir')

elixir(function(mix) {
    mix
        .less('app.less')
        .browserify('app.js')
        .browserSync({
            proxy: 'localhost:9000',
            open: false
        });
});
