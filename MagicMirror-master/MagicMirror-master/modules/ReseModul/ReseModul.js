'use strict';

Module.register("ReseModul", {

  result: {},
  defaults: {
    updateInterval: 60000
  },

  getStyles: function() {
    return ["ReseModul.css"];
  },

  start: function() {
    this.getTickers();
    this.scheduleUpdate();
  },

  getDom: function() {
    var wrapper = document.createElement("table");
    wrapper.className = 'medium bright';
    wrapper.className = 'ticker';

    var data = this.result;
    var symbolElement =  document.createElement("div");
    var symbol = "Tid till avgång:";
    var from = data.TripList.Trip[0].LegList.Leg.Origin.name;
    var to = data.TripList.Trip[0].LegList.Leg.Destination.name;
    var tider = [];
    for(var i =0; i<data.TripList.Trip.length; i++){
      tider[i]=data.TripList.Trip[i].LegList.Leg.Origin.time;
      
    }
    var ankomst = [];
    for(var i =0; i<data.TripList.Trip.length; i++){
      ankomst[i]=data.TripList.Trip[i].LegList.Leg.Destination.time;
      
    }
    if (from) {
      var times = document.createElement("div");
      times.innerHTML = from + " - " + to;
      wrapper.appendChild(times);

            symbolElement.innerHTML = symbol;
      wrapper.appendChild(symbolElement);
      symbolElement.setAttribute("class", "rubrik");

      var tid = document.createElement("span");
      tid.setAttribute("class", "tider");
      var a = new Date();
      var tidarray = [];
      var timeNow = a.getHours()*60+a.getMinutes(); 
      for(var j =0; j<tider.length;j++){
        tidarray[j] = document.createElement("span");
        tidarray[j].setAttribute("class", "lista");
        tidarray[j].innerHTML = ((parseFloat((tider[j].substring(0,2)*60))+parseFloat(tider[j].substring(3)))-timeNow) +" min " + ankomst[j] +" På jobbet";
        wrapper.appendChild(tidarray[j]);
      }
        tidarray[1].style.opacity = 0.4;  
        tidarray[2].style.opacity = 0.3;
        tidarray[3].style.opacity = 0.2;
        tidarray[4].style.opacity = 0.1;
    }
    return wrapper;
  },

  scheduleUpdate: function(delay) {
    var nextLoad = this.config.updateInterval;
    if (typeof delay !== "undefined" && delay >= 0) {
      nextLoad = delay;
    }

    var self = this;
    setInterval(function() {
      self.getTickers();
    }, nextLoad);
  },

  getTickers: function () {
    var url = 'http://api.sl.se/api2/TravelplannerV2/trip.json?key=cf85888d5497444795b1ba969383ebcd&originId=9204&destId=1002&searchForArrival=0';
    this.sendSocketNotification('GET_TICKERS', url);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "TICKERS_RESULT") {
      this.result = payload;
      this.updateDom(self.config.fadeSpeed);
    }
  },

});
