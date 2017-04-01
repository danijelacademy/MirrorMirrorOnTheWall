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
    wrapper.setAttribute("id", "allt");
    wrapper.className = 'medium bright';
    wrapper.className = 'ticker';

    var data = this.result;
    var headtr =  document.createElement("tr");
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
      var times = document.createElement("tr");
      var fromvar = document.createElement("th");
      var tovar = document.createElement("th");
      var avgang = document.createElement("td");
      avgang.innerHTML="Avgång";
      var framme = document.createElement("td");
      framme.innerHTML="Framme";
      times.appendChild(fromvar);
      times.appendChild(tovar);
      times.setAttribute("id", "destheader");
      times.style.opacity = 0.7;
      fromvar.innerHTML = from + " ";
      tovar.innerHTML = " - " + to;
      wrapper.appendChild(times);

      headtr.appendChild(avgang);
      headtr.appendChild(framme);
      headtr.setAttribute("id", "tablehead");
      wrapper.appendChild(headtr);

      var tid = document.createElement("tr");
      tid.setAttribute("class", "tider");
      var a = new Date();
      var tidarraytd = [];
      var tidarraytdd = [];
      var tidarraytr = [];
      var timeNow = a.getHours()*60+a.getMinutes(); 
      for(var j =0; j<tider.length;j++){
        tidarraytr[j] = document.createElement("tr");
        tidarraytd[j] = document.createElement("td");
        tidarraytd[j].innerHTML = ((parseFloat((tider[j].substring(0,2)*60))+parseFloat(tider[j].substring(3)))-timeNow) +" min";
        tidarraytd[j].setAttribute("class", "avgtider");
        tidarraytdd[j] = document.createElement("td");
        tidarraytdd[j].innerHTML = ankomst[j];
        tidarraytdd[j].setAttribute("class", "framtider");
        tidarraytr[j].appendChild(tidarraytd[j]);
        tidarraytr[j].appendChild(tidarraytdd[j]);
        wrapper.appendChild(tidarraytr[j]);
      }
        tidarraytr[1].style.opacity = 0.5;  
        tidarraytr[2].style.opacity = 0.4;
        tidarraytr[3].style.opacity = 0.3;
        tidarraytr[4].style.opacity = 0.2;
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
