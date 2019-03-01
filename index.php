<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Blue Harvest</title>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.11.2"></script>
        <script type="text/javascript" src="tensorflow.js"></script>
    </head>
    <body>
        <?php
        ?>
        <input type="text" name="enter" class="enter" value="" id="yValue"/>
        <input type="button" value="click" onclick="yInput();"/>
        <script type="text/javascript">
            var lol = document.getElementById('yValue');
            function yInput() {
                learnLinear(yValue.value);
            }
        </script>
        <div id="output_field"></div>
    </body>
</html>
