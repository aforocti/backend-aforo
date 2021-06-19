const app = require('./app');

app.listen(process.env.PORT || 8080,() =>console.log('App listening on url http://localhost:'+ 8080))