<?php
/* Source: https://github.com/garciart/Master-Pages-In-PHP */
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Blue Harvest</title>
        <link rel="stylesheet" type="text/css" href="StyleSheet.css">
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.11.2"></script>
        <script type="text/javascript" src="textPrep.js"></script>
        <script type="text/javascript" src="tensorFlow.js"></script>
        <!-- Content placeholder for head content -->
        <?php echo $contentPlaceHolder1; ?>
    </head>
    <body>
        <header>
            <div style="clear:both; overflow:auto;">
                <img src="sherpa_q2a_logo.png" alt="" style="float:left; height:100px;"/>
                <h1>Welcome to Blue Harvest #1!</h1>                
                <!-- Content placeholder for header element content -->
                <?php echo $contentPlaceHolder2; ?>
                <hr>
            </div>
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