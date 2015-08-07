Given the following HTML provide a JavaScript function that takes first name, last name
and status as arguments, inserts a new table row into the markup below sorted by name
and saves the information to the database. You can modify the HTML as needed. You can
assume that sending data to the URL, “/member/save”, will save the name and status.
Please list any open source JavaScript libraries used in this solution.

<table>
<thead>
<tr>
<th>Name</th>
<th>Status</th>
</tr>
</thead>
<tbody>
<tr>
<td>Doe, John</td>
<td>Approved</td>
</tr>
</tbody>
</table>

#Assumptions  

 - Raw JavaScript.
 - Just the basics.
 - Sending JSON, receiving text or JSON response.
 - The save part of this test is just pseudo and I don't need to open up a connection to a server to test the route.

 #Installation

- git clone https://github.com/JohnPittman/orgsync-interview-test-sortandsave.git
- open ~/src/index.html