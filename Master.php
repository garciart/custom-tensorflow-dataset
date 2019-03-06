<?php
/*
 *  Created on : Mar 3, 2019, 5:42:29 PM
 *  Author     : Rob Garcia at rgarcia@rgprogramming.com
 */
?>
<!DOCTYPE html>
<!-- Master Page code from https://github.com/garciart/Master-Pages-In-PHP -->
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Blue Harvest</title>
        <link rel="stylesheet" type="text/css" href="StyleSheet.css">
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"></script>
        <script type="text/javascript" src="textPrep.js"></script>
        <script type="text/javascript" src="pluralize.js"></script>
        <script type="text/javascript" src="trainingData.js"></script>
        <!-- Content placeholder for head content -->
        <?php echo $contentPlaceHolder1; ?>
    </head>
    <body>
        <header>
            <img id="sherpaLogo" src="sherpa_q2a_logo.png" alt="2019 Sherpas" />
            <h1>Welcome to Blue Harvest #1!</h1>                
            <!-- Content placeholder for header element content -->
            <?php echo $contentPlaceHolder2; ?>
            <hr>
        </header>
        <main>
            <!-- Content placeholder for main element content -->
            <?php echo $contentPlaceHolder3; ?>
            <hr>
        </main>
        <footer>
            <!-- Content placeholder for footer element content -->
            <?php echo $contentPlaceHolder4; ?>
        </footer>
    </body>
</html>