# Acronyms for Tina!
<img src="image00.png" alt="" style="border: 1px solid black;" />
<hr>
<h2>Overview</h2>
<p>During my internship at NASA's Langley Research Center, one of our mentors asked us to help her out on a project she's been working on: an acronym disambiguation system. She's absolutely right; acronyms are a pain in the a** when you are trying to learn about something really dense in a hurry (yay, grad school!). Plus, when I was in the military, I remember the "glazed-eye look" that would appear on my friends and family's faces when I broke into an acronym-filled story. I'm worse; you break out the acronyms, and I fall asleep!</p>
<p>One of my fellow Sherpas, Wesley, got pretty far using IBM Watson and the Natural Language Toolkit (NLTK) Project. Here's my take on Tina's project using TensorFlow.js. In a nutshell, it replaces the Iris dataset with words that can be abbreviated using "CSS". Since this is only a proof of concept, I limited the dataset to CSS acronyms that had at least 3000 results in a regular Google search and at least one appearance in Google Scholar:</p>
<div style="margin: auto;">
<table>
<tr><th>Search Terms</th><th>Number of Results</th></tr>
<tr><td>"cascading style sheets" "css"</td><td>4140000</td></tr>
<tr><td>"customer service system" "css"</td><td>805000</td></tr>
<tr><td>"central security service" "css"</td><td>260000</td></tr>
<tr><td>"customer satisfaction survey" "css"</td><td>140000</td></tr>
<tr><td>"combat service support" "css"</td><td>70200</td></tr>
<tr><td>"customer self service" "css"</td><td>54400</td></tr>
<tr><td>"content scramble system" "css"</td><td>35000</td></tr>
<tr><td>"catalina sky survey" "css"</td><td>32900</td></tr>
<tr><td>"continuous system simulation"</td><td>7060</td></tr>
<tr><td>"confederate states ship" "css"</td><td>3980</td></tr>
<tr><td>"computer subsystem" "css"</td><td>3830</td></tr>
<tr><td>"coarse sun sensor" "css"</td><td>3700</td></tr>
</table>
</div>
<p>This is how it works:</p>
<ol>
<li>Remove the stop words (e.g., and, the, etc.), using the list of stop words from the Natural Language Toolkit Project (https://www.nltk.org/nltk_data/).</li>
<li>Convert all the words to singular using <a href="https://github.com/blakeembrey/pluralize" title="Pluralize" target="_blank">Blake Embrey's awesome script</a>.</li>
<li>Identify how often each word appears in the text (i.e., the frequency).</li>
<li>Map the words to the features in the dataset, using the word's frequency of appearance as it's weight (normalized to a scale of 0 to 1).</li>
<li>Kick off the TensorFlow engine, using the built-in CSS dataset for training and testing. TensorFlow.js is awesome and Laurence Moroney at Google does an awesome job explaining how it works: <a href="https://www.youtube.com/playlist?list=PLQY2H8rRoyvwLbzbnKJ59NkZvQAW9wLbx" title="Coding TensorFlow" target="_blank">check him out at Coding TensorFlow!</a></li>
<li>Run the map of words against the trained dataset and get a prediction.</li>
</ol>
<p>The <a href="https://github.com/tensorflow/tfjs-examples/tree/master/iris" title="Iris classification application" target="_blank">Iris classification application</a> is like the "Hello, World!" of machine learning, and it's a great way to get started. I modified it to use words, but you can replace the dataset with any stats you want, such as readings from engine computers, IoT devices, etc. For a deeper dive, check out <a href="https://www.coursera.org/learn/machine-learning" title="Coursera: Machine Learning" target="_blank"> Andrew Ng's great tutorials on Coursera</a>. Have fun and good luck!</p>
<hr>
<h2>Sample Text to Process:</h2>
<h3>Cascading Style Sheets:</h3>
<p>Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language like HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript. CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts. This separation can improve content accessibility, provide more flexibility and control in the specification of presentation characteristics, enable multiple web pages to share formatting by specifying the relevant CSS in a separate .css file, and reduce complexity and repetition in the structural content. Separation of formatting and content also makes it feasible to present the same markup page in different styles for different rendering methods, such as on-screen, in print, by voice (via speech-based browser or screen reader), and on Braille-based tactile devices. CSS also has rules for alternate formatting if the content is accessed on a mobile device. The name cascading comes from the specified priority scheme to determine which style rule applies if more than one rule matches a particular element. This cascading priority scheme is predictable. The CSS specifications are maintained by the World Wide Web Consortium (W3C). Internet media type (MIME type) text/css is registered for use with CSS by RFC 2318 (March 1998). The W3C operates a free CSS validation service for CSS documents. In addition to HTML, other markup languages support the use of CSS including XHTML, plain XML, SVG, and XUL.</p>
<h3>National Aeronautics and Space Administration:</h3>
<p>The National Aeronautics and Space Administration (N.A.S.A.) is an independent agency of the United States Federal Government responsible for the civilian space program, as well as aeronautics and aerospace research. NASA was established in 1958, succeeding the National Advisory Committee for Aeronautics (NACA). The new agency was to have a distinctly civilian orientation, encouraging peaceful applications in space science. Since its establishment, most US space exploration efforts have been led by NASA, including the Apollo Moon landing missions, the Skylab space station, and later the Space Shuttle. NASA is supporting the International Space Station and is overseeing the development of the Orion Multi-Purpose Crew Vehicle, the Space Launch System and Commercial Crew vehicles. The agency is also responsible for the Launch Services Program which provides oversight of launch operations and countdown management for unmanned NASA launches. NASA science is focused on better understanding Earth through the Earth Observing System; advancing heliophysics through the efforts of the Science Mission Directorate's Heliophysics Research Program; exploring bodies throughout the Solar System with advanced robotic spacecraft missions such as New Horizons; and researching astrophysics topics, such as the Big Bang, through the Great Observatories and associated programs.</p>
<h3>Who Knows? (Confidence Level Below 0.5):</h3>
<p>Whether I shall turn out to be the hero of my own life, or whether that station will be held by anybody else, these pages must show. To begin my life with the beginning of my life, I record that I was born (as I have been informed and believe) on a Friday, at twelve o’clock at night. It was remarked that the clock began to strike, and I began to cry, simultaneously. In consideration of the day and hour of my birth, it was declared by the nurse, and by some sage women in the neighborhood who had taken a lively interest in me several months before there was any possibility of our becoming personally acquainted, first, that I was destined to be unlucky in life; and secondly, that I was privileged to see ghosts and spirits; both these gifts inevitably attaching, as they believed, to all unlucky infants of either gender, born towards the small hours on a Friday night. I need say nothing here, on the first head, because nothing can show better than my history whether that prediction was verified or falsified by the result. On the second branch of the question, I will only remark, that unless I ran through that part of my inheritance while I was still a baby, I have not come into it yet. But I do not at all complain of having been kept out of this property; and if anybody else should be in the present enjoyment of it, he is heartily welcome to keep it.</p>
