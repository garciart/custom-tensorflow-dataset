<?php
/*
 *  Author     : Rob Garcia at rgarcia@rgprogramming.com.
 *  Master Page code from https://github.com/garciart/Master-Pages-In-PHP
 */

/* Start placing content into an output buffer */
ob_start();
?>
<!-- Head Content Start -->
<title>Index Page Title</title>
<!-- Head Content End -->
<?php
/* Store the content of the buffer for later use */
$contentPlaceHolder1 = ob_get_contents();
/* Clean out the buffer, but do not destroy the output buffer */
ob_clean();
?>
<!-- Body Content Start -->
<!-- Header Element Content -->
<h3>TensorFlow.js Acronym Processing Unit</h3>
<?php
/* Store the content of the buffer for later use */
$contentPlaceHolder2 = ob_get_contents();
/* Clean out the buffer, but do not destroy the output buffer */
ob_clean();
?>
<!-- Main Element Content -->
<p>1. Enter text below:</p>
<textarea id="myText" rows="25" style="width:100%;">
The National Aeronautics and Space Administration (N.A.S.A.) is an independent agency of the United States Federal Government responsible for the civilian space program, as well as aeronautics and aerospace research.

NASA was established in 1958, succeeding the National Advisory Committee for Aeronautics (NACA). The new agency was to have a distinctly civilian orientation, encouraging peaceful applications in space science. Since its establishment, most US space exploration efforts have been led by NASA, including the Apollo Moon landing missions, the Skylab space station, and later the Space Shuttle. NASA is supporting the International Space Station and is overseeing the development of the Orion Multi-Purpose Crew Vehicle, the Space Launch System and Commercial Crew vehicles. The agency is also responsible for the Launch Services Program which provides oversight of launch operations and countdown management for unmanned NASA launches.

NASA science is focused on better understanding Earth through the Earth Observing System; advancing heliophysics through the efforts of the Science Mission Directorate's Heliophysics Research Program; exploring bodies throughout the Solar System with advanced robotic spacecraft missions such as New Horizons; and researching astrophysics topics, such as the Big Bang, through the Great Observatories and associated programs.
</textarea>
<input type="button" value="Process text" onclick="textPrepController();"/>
<br>
<div id="frequencyTable"></div>
<br>
<div id="dataSetTable"></div>
<br>
<div id="weightsList"></div>
<br>
<div id="splitText"></div>
<br>
<div id="confidenceList"></div>
<?php
/* Store the content of the buffer for later use */
$contentPlaceHolder3 = ob_get_contents();
/* Clean out the buffer once again, but do not destroy the output buffer */
ob_clean();
?>
<!-- Footer Element Content -->
<!-- Here's an inactive link. We'll add the page later -->
<!--<p><a href="newpage.php" title="Link to Another Page...">Link to Another Page...</a></p>-->
<!-- Body Content End -->
<?php
/* Store the content of the buffer for later use */
$contentPlaceHolder4 = ob_get_contents();
/* Clean out the buffer and turn off output buffering */
ob_end_clean();
/* Call the master page. It will echo the content of the placeholders in the designated locations */
include("master.php");
?>