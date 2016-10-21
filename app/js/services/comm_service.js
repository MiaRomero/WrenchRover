module.exports = function(app) {
  app.factory('cmService', [function() {
    this.url = 'https://wrenchroverapi.herokuapp.com/service_requests';
    this.chosenService = null;
    this.chosenDashlight = null;
    var chosen = [];
    this.chosen = chosen;
    var oilChosen = [];
    this.oilChosen = oilChosen;
    var dashChosen = [];
    this.dashChosen = dashChosen;
    var that = this;
    this.count = 0;
    this.nextCount = 0;
    this.dashCount = 0;
    this.textInput = null;
    this.thing = 'andrews';

    console.log(this.count);

    return {
      chosen: chosen,

      oilSelected: function(value, second) {
        this.chosenService = second;
        if (value && that.count === 0) {
          that.count = 5;
          oilChosen.push(second);
          console.log(that.count);

        }
        else {
          that.count = 0;
          var index = oilChosen.indexOf(second);
          oilChosen.splice(index);
        }
        this.count = that.count;
        this.oilChosen = that.oilChosen;
        window.localStorage.oilChosen = this.oilChosen;

      },


      checkedSelected: function(value, second) {
        this.chosenService = second;
        if (value) {
        //   that.value = false;
          that.nextCount = 7;
          chosen.push(second);
        }
        else {
          var index = chosen.indexOf(second);
          chosen.splice(index, 1);
          if (chosen.length === 0) {
            that.nextCount = 0;
          }
          console.log(that.nextCount);
        }
        this.chosen = that.chosen;
        console.log(that.nextCount);
        window.localStorage.chosen = this.chosen;
        this.nextCount = that.nextCount;
        console.log(this.chosenService);
      },

      textAreaFunc: function(value) {
        this.textInput = value;
        if (value === undefined) {
          window.localStorage.removeItem('describeIssue');

        }
        else {
          window.localStorage.describeIssue = this.textInput;
        //   window.localStorage.example = 'foo bar';
        }
      },

      dashSelect: function(y) {
        console.log(y);
        this.chosenDashlight = y;
        this.dashChosen = that.dashChosen;
        if (dashChosen.indexOf(y) == -1) {
          dashChosen.push(y);
          that.dashCount = 9;
        }
        else {

          var index = dashChosen.indexOf(y);
          dashChosen.splice(index, 1);
          if (dashChosen.length === 0) {
            that.dashCount = 0;
          }


        }

        this.dashCount = that.dashCount;
        window.localStorage.dashChosen = this.dashChosen;
        console.log(this.chosenDashlight);
      },


      removeChosenService: function(x) {
        console.log(x);
        var index = chosen.indexOf(x);
        console.log('removing');
        console.log(index);
        chosen.splice(index, 1);
        console.log(chosen);
        if (chosen.length === 0) {
          that.nextCount = 0;
        }
        this.chosen = that.chosen;
        this.nextCount = that.nextCount;
        window.localStorage.chosen = this.chosen;
        this.nextCount = that.nextCount;
        console.log( this.chosenService);
      },

      removeChosenDash: function(x) {
        console.log(x);
        var index = dashChosen.indexOf(x);
        console.log('removing');
        console.log(index);
        dashChosen.splice(index, 1);
        if (dashChosen.length === 0) {
          that.dashCount = 0;
        }
        this.dashChosen = that.dashChosen;
        this.dashCount = that.dashCount;
        window.localStorage.dashChosen = this.dashChosen;
        this.dashCount = that.dashCount;

      },

      removeChosenOil: function(x) {
        console.log(x);
        var index = oilChosen.indexOf(x);
        console.log('removing');
        console.log(index);
        oilChosen.splice(index, 1);
        if (oilChosen.length === 0) {
          that.count = 0;
        }
        this.oilChosen = that.oilChosen;
        this.count = that.count;
        window.localStorage.oilChosen = this.oilChosen;
        this.oilCount = that.oilCount;

      },
      nextPage: function() {
        console.log('next page');
      }

    };
  }]);

};
