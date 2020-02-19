<!doctype html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>StemWijzer Tweede Kamer 2017</title>

    <!--    Stylesheets-->
    <link rel="stylesheet" href="assets/css/w3.css">
    <link rel="stylesheet" href="assets/css/stylesheet.css">
</head>
<body>
    <div class="w3-container" id="container">
        <div class="w3-row">
            <div id="foreground" class="foreground w3-col l10 w3-white">
                <div id="progress-bar" class="w3-col m12"></div>
                <div class="content w3-col m12">
                    <div id="previousArrow-box">
                        <img id="previousArrow" src="assets/img/icon-arrow-back.svg" alt="">
                    </div>
                    <div class="radioButtons-box">
                        <input type="radio" id="regular" value="regular" name="filter">
                        <label for="regular">Alle resultaten</label>

                        <input type="radio" id="secular" value="secular" name="filter">
                        <label for="regular">Seculiere partijen</label>

                        <input type="radio" id="big" value="big" name="filter">
                        <label for="big">Grote partijen</label>
                    </div>
                    
                    <div class="checkbox-box">
                        <input type="checkbox" id="weightChkbx" name="weightChkbx">
                        <label for="weightChkbx">Deze stelling is extra belangrijk.</label>
                    </div>
                    <div id="title" class="title"></div>
                    <div id="description" ></div>
                    <div id="buttons"></div>
                    <div id="nextArrow-box">Sla deze vraag over
                        <img id="nextArrow" src="assets/img/icon-backspace-right.svg" alt="">
                    </div>
                </div>

                <div class="footer" id="footer">
                    <img id="logo-stemwijzer" src="assets/img/logo-stemwijzer-white.png" alt="">
                    <img id="logo-1v-s" src="assets/img/logo-1v-small.svg" alt="">
                    <img id="logo-prodemos" src="assets/img/logo-prodemos.svg" alt="">
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="assets/js/data.js"></script>
    <script type="text/javascript" src="assets/js/script.js"></script>
</body>
</html>