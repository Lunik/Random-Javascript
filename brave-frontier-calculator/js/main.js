//Ajoute du temps à une date
function addTime(date,day,hours,minutes,seconds) {
  return new Date(date.getTime() + day*3600000*24 + hours*3600000 + minutes*60000 + seconds*1000);
}

//Convertie des secondes en objet {Heure,Minutes,Secondes}
function secondsToDDHHMMSS(totalSec){
  var days = parseInt( totalSec / (3600*24) );
  var hours = parseInt( totalSec / 3600 ) % 24;
  var minutes = parseInt( totalSec / 60 ) % 60;
  var seconds = totalSec % 60;

  return {
    D: days,
    H: hours,
    M: minutes,
    S: seconds
  }
}

//Convertie des minutes en objet {Heure,Minutes,Secondes}
function minutesToDDHHMMSS(totalMin){
  return secondsToDDHHMMSS(totalMin*60);
}

//Renvoi le jour de la semaine sous forme de texte
Date.prototype.textDay = function(){
  switch (this.getDay()){
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 0:
      return "Sunday";
    default :
      return -1;
  }
};

//Renvoi le mois sous forme de texte
Date.prototype.textMonth = function(){
  switch (this.getMonth()){
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default :
      return -1;
  }
};

//Renvoi l'heure sous forme HH:MM:SS
Date.prototype.HHMMSS = function(){
  var H, M, S;
  H = this.getHours();
  M = this.getMinutes();
  S = this.getSeconds();

  if(H<10)
    H = "0"+H;
  if(M<10)
    M = "0"+M;
  if(S<10)
    S = "0"+S;

  return H+":"+M+":"+S;
};

//Revoi la date sous forme "Day Date Month, HH:MM:SS"
Date.prototype.textDate = function(){
  return this.textDay()
  +" "+this.getDate()
  +" "+this.textMonth()
  +", "+this.HHMMSS();
};

//Lance un Countdown
function LaunchCountDown(div,title,date,endFunction) {
  //Ajout des Divs
  if(!$("."+div).html()) {
    $('.container').append('<div class="timer-wrap">' +
    '<h3>REMAINING TIME BEFORE: '+title+'</h3>' +
    '<div class="timer ' + div + '"></div>' +
    '<span>Days</span><span>Hours</span>' +
    '<span>Minutes</span>' +
    '<span>Seconds</span>' +
    '</div>');
  }
  //Init de la date
  var CountDownTo = date;

  //Definition du timer
  $("."+div).html(
    //Ajout des divs
    '<div id="cnt_2'+div+'" class="cntDigit" style="margin-top: 0px;"></div>'
    + '<div id="cnt_3'+div+'" class="cntDigit" style="margin-top: 0px;"></div>'
    + '<div id="cnt_4'+div+'" class="cntDigit" style="margin-top: 0px;"></div>'
    + '<div id="cnt_5'+div+'" class="cntDigit" style="margin-top: 0px;"></div>'
    + '<div id="cnt_6'+div+'" class="cntDigit" style="margin-top: 0px;"></div>'
    + '<div id="cnt_7'+div+'" class="cntDigit" style="margin-top: 0px;"></div>'
    + '<div id="cnt_8'+div+'" class="cntDigit" style="margin-top: 0px;"></div>'
    + '<div id="cnt_9'+div+'" class="cntDigit" style="margin-top: 0px;"></div>'
  ).countdown(CountDownTo).on('update.countdown', function (event) {
      //Event on Update Countdown
      $("#cnt_2"+div+"").css('margin-top', (-Math.floor(event.strftime("%-D") / 10) * 40) + 'px');
      $("#cnt_3"+div+"").css('margin-top', (-event.strftime("%-D") % 10 * 40) + 'px');
      $("#cnt_4"+div+"").css('margin-top', (-Math.floor(event.strftime("%H") / 10) * 40) + 'px');
      $("#cnt_5"+div+"").css('margin-top', (-event.strftime("%H") % 10 * 40) + 'px');
      $("#cnt_6"+div+"").css('margin-top', (-Math.floor(event.strftime("%M") / 10) * 40) + 'px');
      $("#cnt_7"+div+"").css('margin-top', (-event.strftime("%M") % 10 * 40) + 'px');
      $("#cnt_8"+div+"").css('margin-top', (-Math.floor(event.strftime("%S") / 10) * 40) + 'px');
      $("#cnt_9"+div+"").css('margin-top', (-event.strftime("%S") % 10 * 40) + 'px');
    }).on("finish.countdown", endFunction);
}

var ENERGY_REGEN_TIME = 7;
var CURRENT_ENERGY;
var WANTED_ENERGY;
var first_energy;

function submitForm(){
  //Recup valeur current_energy
  var ValEnergy = parseInt($("#energy").val());
  if(ValEnergy>=0 && ValEnergy<=500) {
    $("#label_energy").attr('class',"ok");
    CURRENT_ENERGY = $("#energy").val();
  }else {
    $("#label_energy").attr('class',"erreur");
  }

  //Recup valeur wanted_energy
  var ValWanted = parseInt($("#wanted_energy").val());
  if(ValWanted>=0 && ValWanted<=500) {
    $("#label_wanted_energy").attr('class',"ok");
    WANTED_ENERGY = $("#wanted_energy").val();
  }else {
    $("#label_wanted_energy").attr('class',"erreur");
  }

  //Recup valeur first_energy
  if($("#next_energy").val().indexOf(":") != -1) {
    $("#label_next_energy").attr('class',"ok");
    first_energy = $("#next_energy").val().split(":");

    if(first_energy[0]>=0 && first_energy[0]<=500 && first_energy[1]>=0 && first_energy[1]<=500) {
      first_energy[0] = parseInt(first_energy[0]);
      first_energy[1] = parseInt(first_energy[1]);
    } else {
      first_energy = null;
      $("#label_next_energy").attr('class',"erreur");
    }

  }else {
    $("#label_next_energy").attr('class',"erreur");
  }

  //Efface le formulaire
  if(CURRENT_ENERGY>=0 && WANTED_ENERGY>=0 && first_energy) {

    //Count Wanted Energy
    var resDDHHMMSS = minutesToDDHHMMSS((WANTED_ENERGY-1 - CURRENT_ENERGY)*ENERGY_REGEN_TIME);
    console.log(resDDHHMMSS);
    var endTime = addTime(new Date(),
      resDDHHMMSS.D,
      resDDHHMMSS.H,
      first_energy[0]+resDDHHMMSS.M,
      first_energy[1]+resDDHHMMSS.S-1
    );
    //Affichage Current Energy
    $('.container').html(
      "<h2 class='total_energy'>Total Energy: <span class='current_energy'>"+CURRENT_ENERGY+"</span></h2>"
      +"<h3 class='wanted_energy'>Wanted Energy:</h3>"
      +"<span class='date_wanted_energy'>"+endTime.textDate()+"</span>"
    );

    document.title = "("+CURRENT_ENERGY+") "+document.title;
    //CountDown Next Energy
    LaunchCountDown("timer_next_energy",
      "NEXT ENERGY",
      addTime(
        new Date(),
        0,
        0,
        first_energy[0],
        first_energy[1]-1
      ),
      function () {
        CURRENT_ENERGY++;
        $(".current_energy").html(CURRENT_ENERGY);
        document.title = "(" + CURRENT_ENERGY + ") " + document.title.split(") ")[1];

        LaunchCountDown("timer_next_energy",
          "NEXT ENERGY",
          addTime(new Date(),
            0,
            0,
            ENERGY_REGEN_TIME,
            0
          )
        );

        //Count Wanted Energy
        var resDDHHMMSS = minutesToDDHHMMSS((WANTED_ENERGY - CURRENT_ENERGY)*ENERGY_REGEN_TIME);
        var endTime = addTime(new Date(),
          resDDHHMMSS.D,
          resDDHHMMSS.H,
          resDDHHMMSS.M,
          resDDHHMMSS.S
        );

        LaunchCountDown("timer_full_energy",
          "WANTED ENERGY",
          endTime,
          function(){
            $(".timer_full_energy").html("FIN").css("background","none");
          });
      });

    //CountDown Full Energy

    LaunchCountDown("timer_full_energy",
      "WANTED ENERGY",
      endTime,
      function(){
        $(".timer_full_energy").html("FIN").css("background","none");
      });
  }
}
//EVENT

//Click on Submit
$("body").on("click","#submit_energy",submitForm);

//Enter Event
$(window).keydown(function (event) {
  if(event.which == 13)
    submitForm();
});

//Random entre min et max
function random( min, max ) {
  return Math.round(Math.random() * ( max - min ) + min);
}

//initialise le background
function initBackground(){
  var walpaper = [
    "http://i.imgur.com/RDliBpB.jpg",
    "http://fc02.deviantart.net/fs70/f/2014/147/7/0/lightning_units____by_fickleheartedgeek-d7jy9ih.jpg",
    "http://fc01.deviantart.net/fs71/f/2014/147/5/8/dark_units____by_fickleheartedgeek-d7jya0g.jpg",
    "http://fc08.deviantart.net/fs71/f/2014/147/9/4/earth_units____by_fickleheartedgeek-d7jy9x4.jpg",
    "http://fc03.deviantart.net/fs71/f/2014/147/6/9/water_units____by_fickleheartedgeek-d7jy9qc.jpg",
    "http://fc06.deviantart.net/fs70/f/2014/147/6/0/wallpaper12_by_fickleheartedgeek-d7jy9d1.jpg",
    "http://fc07.deviantart.net/fs71/f/2014/285/9/1/brave_frontier_wallpapers__phone_edition__by_forgotten5p1rit-d82ifxa.png"
    ];
  var r = random(0,(walpaper.length-1));
  $("body").css("background-image","url("+walpaper[r]+")")
  $(".imgUrl").html(walpaper[r]);
}

initBackground();