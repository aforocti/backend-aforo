const app = require('./app');

app.listen(process.env.PORT || 3000,() =>console.log('App listening on url http://localhost:'+ 3000))