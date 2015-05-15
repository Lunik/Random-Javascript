Date.prototype.getYYYYMMDD = function(){
  var dateRes = "";
  dateRes +=
    this.getFullYear()+"/"
    +(this.getMonth()+1)+"/"
    +this.getDate();

  return dateRes;
};
/*
var date = new Date();
date.setDate(date.getDate() + 1);
var CountDownTo = date.getYYYYMMDD();
*/
setTimeout(function(){
  var CountDownTo = $(".date").html();

  $(".timer").html(
    '<div id="cnt_0" class="cntDigit" style="margin-top: 0px;"></div>'
    +'<div id="cnt_1" class="cntDigit" style="margin-top: 0px;"></div>'
    +'<div id="cnt_2" class="cntDigit" style="margin-top: 0px;"></div>'
    +'<div id="cnt_3" class="cntDigit" style="margin-top: 0px;"></div>'
    +'<div id="cnt_4" class="cntDigit" style="margin-top: 0px;"></div>'
    +'<div id="cnt_5" class="cntDigit" style="margin-top: 0px;"></div>'
    +'<div id="cnt_6" class="cntDigit" style="margin-top: 0px;"></div>'
    +'<div id="cnt_7" class="cntDigit" style="margin-top: 0px;"></div>'
    +'<div id="cnt_8" class="cntDigit" style="margin-top: 0px;"></div>'
    +'<div id="cnt_9" class="cntDigit" style="margin-top: 0px;"></div>'
  ).countdown(CountDownTo).on('update.countdown', function(event){
      $("#cnt_0").css('margin-top',(-Math.floor(event.strftime("%-w")/10)*40)+'px');
      $("#cnt_1").css('margin-top',(-event.strftime("%-w")%10*40)+'px');
      $("#cnt_2").css('margin-top',(-Math.floor(event.strftime("%-d")/10)*40)+'px');
      $("#cnt_3").css('margin-top',(-event.strftime("%-d")%10*40)+'px');
      $("#cnt_4").css('margin-top',(-Math.floor(event.strftime("%H")/10)*40)+'px');
      $("#cnt_5").css('margin-top',(-event.strftime("%H")%10*40)+'px');
      $("#cnt_6").css('margin-top',(-Math.floor(event.strftime("%M")/10)*40)+'px');
      $("#cnt_7").css('margin-top',(-event.strftime("%M")%10*40)+'px');
      $("#cnt_8").css('margin-top',(-Math.floor(event.strftime("%S")/10)*40)+'px');
      $("#cnt_9").css('margin-top',(-event.strftime("%S")%10*40)+'px');
    }).on("finish.countdown",function(){
      location.reload();
    });
},1000);
