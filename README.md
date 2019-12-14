# Acronyms for Tina!
<img src="image00.png" alt="" />
<p>During my internship at NASA's Langley Research Center, one of our mentors asked us to help her out on a project she's been working on: an acronym disambiguation system. She's absolutely right; acronyms are a pain in the a** when you are trying to learn about something really dense in a hurry (yay, grad school!). Plus, when I was in the military, I remember the "glazed-eye look" that would appear on my friends and family's faces when I broke into an acronym-filled story. I'm worse; you break out the acronyms, and I fall asleep!</p>
<p>One of my fellow Sherpas, Wesley, got pretty far using IBM Watson and the Natural Language Toolkit (NLTK) Project. Here's my take on Tina's project using TensorFlow.js. In a nutshell, it replaces the Iris dataset with words that can be abbreviated using "CSS". Since this is only a proof of concept, I limited the dataset to CSS acronyms that had at least 3000 results in a regular Google search and at least one appearance in Google Scholar:</p>
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
<p>This is how it works:</p>
<ol>
<li>Remove the stop words (e.g., and, the, etc.), using the list of stop words from the Natural Language Toolkit Project (https://www.nltk.org/nltk_data/).</li>
<li>Convert all the words to singular using Blake Embrey's awesome script at https://github.com/blakeembrey/pluralize.</li>
<li>Identify how often each word in the text appears in the text (i.e., the frequency).</li>
<li>Map the words to the features in the dataset, using the frequency of appearance as the word's weight (normalized to a scale of 0 to 1).</li>
<li>Kick off the TensorFlow engine, using the built-in CSS dataset for training and testing. TensorFlow.js is awesome and Laurence Moroney at Google does an awesome job explaining how it works: <a href="https://www.youtube.com/playlist?list=PLQY2H8rRoyvwLbzbnKJ59NkZvQAW9wLbx" title="Coding TensorFlow" target="_blank">check him out at Coding TensorFlow!</a></li>
<li>Run the map of words against the trained dataset and get a prediction.</li>
</ol>
<p>The <a href=" https://github.com/tensorflow/tfjs-examples/tree/master/iris" title="Iris classification code" target="_blank">Iris classification application</a> is like the "Hello, World!" of machine learning, and it's a great way to get started. I modified it to use words, but you can replace the dataset with any stats you want, such as readings from engine computers, IoT devices, etc. For a deeper dive, check out <a href="https://www.coursera.org/learn/machine-learning" title="Coursera: Machine Learning" target="_blank"> Andrew Ng's great tutorials on Coursera</a>. Have fun and good luck!</p>
