const Router = require('express').Router;
const request = require('superagent');
const EventEmitter = require('events');

var vehicleInfoRouter = {};
vehicleInfoRouter.make = Router();
vehicleInfoRouter.model = Router();
vehicleInfoRouter.engine = Router();
vehicleInfoRouter.trim = Router();
vehicleInfoRouter.vin = Router();


vehicleInfoRouter.make.get('/vehicleInfo/:year', (req, res) => {
  var makeTrigger = new EventEmitter();
  request.get('https://api.edmunds.com/api/vehicle/v2/makes?' +
              '&year=' + req.params.year + '&view=basic&fmt=json&api_key=' +
               process.env.EDMUNDS_API)
  .end((err, data) => {
    if (err) console.log(err); // add error handler function
    makeTrigger.emit('finished', data);
  });
  makeTrigger.on('finished', (data) => {
    var parsed = JSON.parse(data.text);
    var makesArray = [];
    for (var i = 0; i < parsed.makes.length; i++) {
      var newMake = {};
      newMake.name = parsed.makes[i].name;
      newMake.niceName = parsed.makes[i].niceName;
      makesArray.push(newMake);
    }
    res.status(200).send(makesArray);
  });
});

vehicleInfoRouter.model.get('/vehicleInfo/:makeNiceName/:year', (req, res) => {
  var modelTrigger = new EventEmitter();
  request.get('https://api.edmunds.com/api/vehicle/v2/' + req.params.makeNiceName +
              '/models?' + 'year=' + req.params.year + '&view=basic&fmt=json&api_key=' +
              process.env.EDMUNDS_API)
  .end((err, data) => {
    if (err) console.log(err); // add error handler function
    modelTrigger.emit('finished', data);
  });
  modelTrigger.on('finished', (data) => {
    var parsed = JSON.parse(data.text);
    var modelsArray = [];
    for (var i = 0; i < parsed.models.length; i++) {
      var newModel = {};
      newModel.name = parsed.models[i].name;
      newModel.niceName = parsed.models[i].niceName;
      modelsArray.push(newModel);
    }
    res.status(200).send(modelsArray);
  });
});

vehicleInfoRouter.trim.get('/vehicleInfo/:makeNiceName/:modelNiceName/:year', (req, res) => {
  var trimTrigger = new EventEmitter();
  request.get('https://api.edmunds.com/api/vehicle/v2/' + req.params.makeNiceName +
              '/' + req.params.modelNiceName + '/' + req.params.year +
              '/styles?view=basic&fmt=json&api_key=' + process.env.EDMUNDS_API)
  .end((err, data) => {
    if (err) console.log(err); // add error handler function
    trimTrigger.emit('finished', data);
  });
  trimTrigger.on('finished', (data) => {
    var parsed = JSON.parse(data.text);
    var trimsArray = [];
    for (var i = 0; i < parsed.styles.length; i++) {
      var newTrim = {};
      newTrim.styleId = parsed.styles[i].id;
      var name = parsed.styles[i].name;
      name = name.split(' (');
      newTrim.name = name[0];
      if (name.length > 1) {
        var engine = name[1].split(')');
        newTrim.engine = engine[0];
      }
      trimsArray.push(newTrim);
    }
    trimsArray.sort((a, b) => {
      var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    res.status(200).send(trimsArray);
  });
});

vehicleInfoRouter.vin.get('/vehicleInfo/vin/vin/vin/:vin', (req, res) => {
  var vinTrigger = new EventEmitter();
  request.get('https://api.edmunds.com/api/v1/vehicle/vin/' + req.params.vin +
              '/configuration?api_key=' + process.env.EDMUNDS_API)
  .end((err, data) => {
    if (err) console.log(err); // add error handler function
    vinTrigger.emit('finished', data);
  });
  vinTrigger.on('finished', (data) => {
    var parsed = JSON.parse(data.text);
    var returnedVehicle = {};
    returnedVehicle.year = parsed.year;
    returnedVehicle.make = parsed.make.name;
    returnedVehicle.model = parsed.model.name;
    var trim = parsed.styles[0].name;
    trim = trim.split(' (');
    returnedVehicle.trim = trim[0];
    if (trim.length > 1) {
      var engine = trim[1].split(')');
      returnedVehicle.engine = engine[0];
    }
    console.log(returnedVehicle);
    res.status(200).send(returnedVehicle);
  });
});

module.exports = exports = vehicleInfoRouter;
