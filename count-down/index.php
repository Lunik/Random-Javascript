<?
  switch($_GET['id']){
    case "christmas":
         $THEME = "christmas";
      break;
    case "newYear":
      $THEME = "newYear";
      break;
    default:
      $THEME = "newYear";
      break;
  }
?>
<!DOCTYPE HTML>
<html>
<head>
  <title>CountDown</title>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
<div class="header"></div>
<div class="container">
  <div class="date"></div>
  <div class="timer-wrap">
    <h3>REMAINING TIME BEFORE: </h3>
    <div class="timer"></div>
    <span>Weeks</span>
    <span>Days</span>
    <span>Hours</span>
    <span>Minutes</span>
    <span>Seconds</span>
  </div>
</div>
<script src="js/jquery-1.10.2.min.js"></script>
<script src="main.js"></script>
<!--Theme-->
<?
  switch($THEME){
    case "christmas":
      echo '<script type="text/javascript" src="Themes/Noel/jsnow.min.js"></script>
      <script src="Themes/Noel/noel.min.js"></script>';
      break;
    case "newYear":
      echo '<script src="Themes/NouvelAn/ny.js">
      </script><script type="text/javascript" src="Themes/NouvelAn/firework.js"></script>';
      break;
    default:
      break;
  }
?>
<!--CountDown-->
<script src="js/jquery.countdown/jquery.countdown.min.js"></script>
<!-- http://livestats.fr - Outils de mesure d'audience en temps réel -->
<script type="text/javascript" src="http://livestats.fr/counter.php?u=lunik"></script>
<!-- Fin de http://livestats.fr -->
</body>

</html>