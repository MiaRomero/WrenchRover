
module.exports = function(app) {
  app.controller('navController', [function() {
    console.log('navbaring');
    this.isNavCollapsed = true;
  }]);
};
