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
        if(Object.keys(this.result).length === 0) {
          return;
        }
        var data = this.result;
        var isArray = Object.prototype.toString.call(data.TripList.Trip[0].LegList.Leg) === '[object Array]';
        console.log("TRIPPP: " + data.TripList.Trip[0].LegList.Leg);
        if(isArray) {
            var from = data.TripList.Trip[0].LegList.Leg[0].Origin.name;
            var to = data.TripList.Trip[0].LegList.Leg[data.TripList.Trip[0].LegList.Leg.length-1].Destination.name;
        } else {
          var from = data.TripList.Trip[0].LegList.Leg.Origin.name;
            var to = data.TripList.Trip[0].LegList.Leg.Destination.name;
        }
            var headtr = document.createElement("tr");
            
            var tider = [];
            for (var i = 0; i < data.TripList.Trip.length; i++) {
              if(isArray) {
                tider[i] = data.TripList.Trip[i].LegList.Leg[0].Origin.time;
                
              } else {
                tider[i] = data.TripList.Trip[i].LegList.Leg.Origin.time;
              }

            }
            var ankomst = [];
            for (var i = 0; i < data.TripList.Trip.length; i++) {
              if(isArray) {
                ankomst[i] = data.TripList.Trip[i].LegList.Leg[data.TripList.Trip[0].LegList.Leg.length-1].Destination.time;
              }
              else {
                ankomst[i] = data.TripList.Trip[i].LegList.Leg.Destination.time;
              }

            }

            if (from) {
                var times = document.createElement("tr");
                var fromvar = document.createElement("th");
                var tovar = document.createElement("th");
                var avgang = document.createElement("td");
                avgang.setAttribute("id", "left");
                avgang.innerHTML = "Avgång";
                var framme = document.createElement("td");
                framme.setAttribute("id", "right");
                framme.innerHTML = "Framme";
                times.appendChild(fromvar);
                times.appendChild(tovar);
                times.setAttribute("id", "destheader");
                times.style.opacity = 0.7;
                fromvar.innerHTML = from + " ";
                tovar.innerHTML = to;
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
                var metroSymbol = '<img src="/modules/ReseModul/metro.gif" alt="metro_pic.gif" class="symbol"> ';
                var pendelSymbol = '<img src="/modules/ReseModul/pendel.gif" alt="pendel.gif" class="symbol"> ';
                var timeNow = a.getHours() * 60 + a.getMinutes();
                function giefnolla(num, nollor) {
                  var zero = nollor - num.toString().length + 1;
                  return Array(+(zero > 0 && zero)).join("0") + num;
                }
                for (var j = 0; j < tider.length; j++) {
                    tidarraytr[j] = document.createElement("tr");
                    tidarraytd[j] = document.createElement("td");
                    console.log(">TYPE: " +data.TripList.Trip[j].LegList.Leg[0].type );
                    if(data.TripList.Trip[j].LegList.Leg[0].type == "METRO"){
                      tidarraytd[j].innerHTML = metroSymbol + giefnolla(((parseFloat((tider[j].substring(0, 2) * 60)) + parseFloat(tider[j].substring(3))) - timeNow),2) + " min";
                    }else if(data.TripList.Trip[j].LegList.Leg[0].type == "TRAIN"){
                      tidarraytd[j].innerHTML = pendelSymbol + giefnolla(((parseFloat((tider[j].substring(0, 2) * 60)) + parseFloat(tider[j].substring(3))) - timeNow),2) + " min";
                    }else{
                      tidarraytd[j].innerHTML = giefnolla(((parseFloat((tider[j].substring(0, 2) * 60)) + parseFloat(tider[j].substring(3))) - timeNow),2) + " min";
                    }
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

    getTickers: function() {
        var url = 'http://api.sl.se/api2/TravelplannerV2/trip.json?key=cf85888d5497444795b1ba969383ebcd&originId=9180&destId=9302&searchForArrival=0';
        this.sendSocketNotification('GET_TICKERS', url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "TICKERS_RESULT") {
            this.result = payload;
            this.updateDom(self.config.fadeSpeed);
        }
    },

});
