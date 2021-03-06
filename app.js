'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express')
var app = express();
var cors = require('cors');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()


var corsOptions = {
  origin: 'http://127.0.0.1:10010',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.static(pathToSwaggerUi))

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/oggme?url=https://www.youtube.com/watch?v=M3ruhqJBSug');
  }
});
