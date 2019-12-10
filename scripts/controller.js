$(document).ready(function () {
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt")
  // client.subscribe(["elective_c","bargs/jane", "aspire/device","Hannah/Patrick","group1/temperature","sensor/temperature/tanilon","genjess","lalaine/jake","rivastibs"]);
  var distance;
  var now;
  var hours;
  var minutes;
  var seconds;
  var dates;
  var months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  var room1 = function () {
    var d = new Date();
    var day = d.getDay() + 10;
    var hr = d.getHours() +1;
    var min = d.getMinutes();
    var sec = d.getSeconds();
    if (min < 10) {
      min = "0" + min;
    }
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    dates = month + " " + day + ", " + year + " " + hr + ":" + min + ":" + sec
    var countDownDate = new Date(dates).getTime();

    var x = setInterval(function () {
      now = new Date().getTime();
      distance = countDownDate - now;
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
      if (distance < 0) {
        clearInterval(x);
        $("#demo1").text("EXPIRED");
        client.publish("room1","off")
      }else{
        $("#demo1").text("REMAINING TIME : " + hours + " : "
        + minutes + " : " + seconds);
      }
    }, 1000);


  }
  var room2 = function () {
    var d = new Date();
    var day = d.getDay() + 10;
    var hr = d.getHours() +1;
    var min = d.getMinutes();
    var sec = d.getSeconds();
    if (min < 10) {
      min = "0" + min;
    }
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    dates = month + " " + day + ", " + year + " " + hr + ":" + min + ":" + sec
    var countDownDate = new Date(dates).getTime();
    // Dec 4, 2019 15:37:25
    var x = setInterval(function () {
      now = new Date().getTime();
      distance = countDownDate - now;
      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance <= 0) {
        clearInterval(x);
        $("#demo2").text("EXPIRED");
        client.publish("room2","off")
      }else{
        $("#demo2").text("REMAINING TIME : " + hours + " : "
        + minutes + " : " + seconds);
      }
    }, 1000);

  }

  $("#on").click(function () {
    client.publish("all_rooms","on")
    $('#theImg').attr("src", "http://www.nhia.org/images/ac10/light-bulb.gif");
  });

  $("#off").click(function () {
    client.publish("all_rooms","off")
    $('#theImg').attr("src", "http://www.qchabad.org/wp-content/uploads/2011/02/Lightbulb.jpg");

  });

  $("#on1").click(function () {
    $("#on1").css("background-color", "red");
    $("#off1").css("background-color", "gray");
    $("#demo1").show()
    room1();
    client.publish("room1","on")
  });

  $("#off1").click(function () {
    $("#on1").css("background-color", "gray");
    $("#off1").css("background-color", "red");
    $("#demo1").text(null);
    $("#demo1").hide()
    client.publish("room1","off")
  });

  $("#on2").click(function () {
    $("#on2").css("background-color", "red");
    $("#off2").css("background-color", "gray");
    $("#demo2").show()
    room2();
    client.publish("room2","on")
  });

  $("#off2").click(function () {
    $("#on2").css("background-color", "gray");
    $("#off2").css("background-color",   "red");
    $("#demo2").text(null);
    $("#demo2").hide()
    client.publish("room2","off")
  });

});