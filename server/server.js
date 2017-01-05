const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

const vehicleInfoRouter = require(__dirname + '/router/edmunds_vehicle_info_router');


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


app.use('/api', vehicleInfoRouter.make);
app.use('/api', vehicleInfoRouter.model);
app.use('/api', vehicleInfoRouter.engine);
app.use('/api', vehicleInfoRouter.trim);
app.use('/api', vehicleInfoRouter.vin);


//
// app.use(express.static(__dirname + '/../build')).get('*', (req, res) => {
//   res.redirect('/#' + req.url);
// });

app.use(express.static(__dirname + '/../build'));

// app.get('*', (req, res, next) => {
//
//     if (req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
//
// res.redirect('https://' + req.hostname + '/#' + req.url);
// } else {
//
//     next();
// }
// });

// app.use('/*', (req, res) => {
//   res.status(404).send('not found');
// });


app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

module.exports = exports = app.listen(app.get('port'), () => {
    console.log('up on ', app.get('port'));
});
