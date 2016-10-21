const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const vehicleInfoRouter = require(__dirname + '/router/edmunds_vehicle_info_router');


app.use('/api', vehicleInfoRouter.make);
app.use('/api', vehicleInfoRouter.model);
app.use('/api', vehicleInfoRouter.engine);
app.use('/api', vehicleInfoRouter.trim);
app.use('/api', vehicleInfoRouter.vin);


app.use(express.static(__dirname + '/../build')).get('*', (req, res) => {
  res.redirect('/#' + req.url);
});

app.use('/*', (req, res) => {
  res.status(404).send('not found');
});


app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

module.exports = exports = app.listen(port, () => {
  console.log('server up on ' + port);
});
