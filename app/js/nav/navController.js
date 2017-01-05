
module.exports = function(app) {
  app.controller('navController', [function() {
    console.log('navbaring');
    this.isNavCollapsed = true;
    this.checkcookies = function() {
      console.log('initting cookie check');
      console.log(navigator.cookieEnabled);
    };

    this.serviceCenter = false;
    this.activeButton = function() {
      this.serviceCenter = !this.serviceCenter;
    };
  }]);
};
