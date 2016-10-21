module.exports = exports = function(app) {
  require('./handle_error')(app);
  require('./main_resource')(app);
  require('./edmunds_vehicle_list_resource')(app);
  require('./vic_clear_selections')(app);
  require('./user_dashboard')(app);
  require('./comm_service')(app);
};
