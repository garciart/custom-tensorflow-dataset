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
        <script type="text/javascript" src="cleantext.js"></script>
        <script type="text/javascript" src="tensorflow.js"></script>
    </head>
    <body>
        <?php
        ?>
        <p>Enter text below:</p>
	<!-- Old standard screen grid! What What? -->
        <textarea id="myText" cols="80" rows="25">
At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies. 
        </textarea>
        <br>
        <input type="button" value="Remove Stop Words" onclick="removeStopWords();"/>
        <p>Enter an x-value to get a y-value for a slope of 2: <input type="text" name="enter" class="enter" value="" id="yValue"/>
            <input type="button" value="Get y-Value" onclick="yInput();"/>
            <script type="text/javascript">
                var yValue = document.getElementById('yValue');
                function yInput() {
                    learnLinear(yValue.value);
                }
            </script></p>
        <div id="output_field"></div>
    </body>
</html>
