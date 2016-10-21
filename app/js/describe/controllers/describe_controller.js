
var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('describeController', ['cmService', '$http', function( cmService, $http) {
    this.descriptions = [];
    this.childrens = [];
    this.errors = [];
    this.checked = null;
    this.oils = [];
    this.service = cmService;
    this.selection = null;

    this.previouslyEntered = localStorage.getItem('describeIssue');
    this.localStorageOil = localStorage.getItem('oilChosen');
    this.localStorageDash = localStorage.getItem('dashChosen');
    this.localStorageChosen = localStorage.getItem('chosen');

    // this.storedVehicle = localStorage.getItem('vehicle');
    this.storedVehicle = JSON.parse(localStorage.getItem('vehicle'));

    // console.log(this.storedVehicle);

    var that = this;
    that.value = this.value;
    this.placeholder = "Tell us what's happening with your car.";
    this.button = 'Enter';
    this.button = that.button;
    this.dashArr2 = [];
    this.dashChild = [];
    this.mainLights = [];

    this.commonLight = {
      common: '../../../images/common_icons/common.png',
      dash: '../../../images/common_icons/dash.png',
      describe: '../../../images/common_icons/describe.png' };
    this.mainLights.push(this.commonLight);
    // console.log(this.mainLights);

    this.dash = {
      one: '../../../images/dashlights/001.png',
      two: '../../../images/dashlights/002.png',
      three: '../../../images/dashlights/003.png',
      four: '../../../images/dashlights/004.png',
      five: '../../../images/dashlights/005.png',
      ten: '../../../images/dashlights/010.png',
      eleven: '../../../images/dashlights/011.png',
      fifteen: '../../../images/dashlights/015.png',
      sixteen: '../../../images/dashlights/016.png',
      seventeen: '../../../images/dashlights/017.png'
    };
    this.dashArr = ['../../../images/dashlights/001.png', '../../../images/dashlights/002.png', '../../../images/dashlights/003.png', '../../../images/dashlights/004.png', '../../../images/dashlights/005.png', '../../../images/dashlights/010.png', '../../../images/dashlights/011.png', '../../../images/dashlights/015.png', '../../../images/dashlights/016.png', '../../../images/dashlights/017.png'];

    this.dashArr2.push(this.dash);
    this.sbArr = [];


    this.sb = {
      children: [
        { imageSrc: '../../../images/dashlights/001.png',
         name: 'Oil Light' },
         { imageSrc: '../../../images/dashlights/002.png',
          name: 'Battery Light' },
          { imageSrc: '../../../images/dashlights/003.png',
           name: 'encircled exclamation point' },
           { imageSrc: '../../../images/dashlights/004.png',
            name: 'Airbag Light' },
            { imageSrc: '../../../images/dashlights/005.png',
             name: 'Temperature Light' },
             { imageSrc: '../../../images/dashlights/010.png',
              name: 'ABS warning' },
              { imageSrc: '../../../images/dashlights/011.png',
               name: 'Check Engine Light' },
               { imageSrc: '../../../images/dashlights/015.png',
                name: 'coils' },
                { imageSrc: '../../../images/dashlights/016.png',
                 name: 'triangle exclamation mark' },
                 { imageSrc: '../../../images/dashlights/017.png',
                  name: 'Tire Pressures' }


      ]
    };

    this.sbArr.push(this.sb);
    for (var i = 0; i < this.sbArr[0].children.length; i++) {
      this.dashChild.push(this.sbArr[0].children[i]);
    }


    $http.get(baseUrl + 'categories')
    .then((res) => {
      this.descriptions = res.data;

      for (var i = 0; i < res.data[0].children.length; i++) {
        if (res.data[0].children[i].name != 'Oil Change') {
          this.childrens.push(res.data[0].children[i]);
        }
        else {
          this.oils.push(res.data[0].children[i]);
        }
      }

    });

    this.oilSelected = function(x, y) {
      var value = this.value;
      cmService.oilSelected(value, y);
    };

    this.checkedSelected = function(x, y) {
      console.log('(else)parenthetical checkSelcted values: ' + x);
      var value = this.value;
      cmService.checkedSelected(value, y);
      console.log(cmService.chosen);

    };


    this.textAreaFunc = function(x) {
      console.log(this.value);
      var value = this.value;
      this.value = 'Thank you';
      cmService.textAreaFunc(value);
    };

    this.editThis = function() {
      console.log(this.placeholder);
      var value = '';
      this.placeholder = 'Update?';
      this.textAreaFunc();
    };

    this.changeText = function() {
      that.button = 'x';
    };

    this.dashSelect = function(x) {
      console.log(x);
      var value = x;
      cmService.dashSelect(value);

    };

    // this.nextPage = function() {
    //   cmService.nextPage();
    // };

    this.removeChosenService = function(z) {
      var x = z;
      cmService.removeChosenService(x);
    };

    this.removeChosenDash = function(value) {
      console.log(value);
      var x = value;
      cmService.removeChosenDash(x);
    };

    this.removeChosenOil = function(value) {
      console.log(value);
      var x = value;
      cmService.removeChosenOil(x);
    };


  }]);
};
