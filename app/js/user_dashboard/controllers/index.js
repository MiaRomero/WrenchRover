module.exports = exports = function(app) {
  require('./user_dashboard_controller')(app);
  require('./add_vehicle_button_controller')(app);
};
