const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const swaggerAutogen = require('swagger-autogen')();
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

app.use(bodyParser.json());
app
  .use('/', require('./routes'))
  //.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));
//app.use('/contacts', require('./routes/contact'));

app.listen(process.env.port || 3000);
console.log('Web Server is listening at port ' + (process.env.port || 3000));
