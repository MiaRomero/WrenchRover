module.exports = exports = function(app) {
  require('./controllers')(app);
  require('./components')(app);

};
