---
layout: particle
title: Fermenter
category: page
permalink: fermenter.html
---

<!-- displayed on login failures -->
<div id="loginFailureDiv" class="alertBox hidden">
<p>Invalid email address or password, please try again.</p>
</div> 

<!-- displayed when an API call fails, usually because of an expired access token -->
<div id="apiFailureDiv" class="alertBox hidden">
<p>An error occurred accessing the API. Try logging in again.</p>
</div> 

<!-- displayed to show the login screen -->
<div id="loginDiv" class="hidden">
<form>
<p>Log in with the email address and password you use for your Particle login:</p>
<table>
<tr><td>Email Address</td><td><input type="text" id="loginUser"/></td></tr>
<tr><td>Password</td><td><input type="password" id="loginPass" /></td></tr>
</table>
<input type="submit" id="loginButton">
</form>
</div>

<!-- displayed to show main UI -->
<div id="mainDiv" class="hidden">

<div id="connected" class="hidden">
<input type="button" class="btn btn-success" value="CONNECTED"/><br>
<p></p>
</div>

<div id="disconnected" class="hidden disconnected">Disconnected</div>

<div id="status" class="hidden">
<input type="button" class="btn btn-info" id="statusLabel" value="COOLING"/>
<p></p>
<div>SETPOINT</div>
<div><input type="text" class="form-control" id="sp" value=" "></div>
<div>BEER</div>
<div><input type="text" class="form-control" id="tt" value=" "></div>
<div>AMBIENT</div>
<div><input type="text" class="form-control" id="at" value=" "></div>
<div>SHED</div>
<div><input type="text" class="form-control" id="ot" value=" "></div>
<div><input type="button" class="btn" id="statusButton" value="Get Status"/></div>
</div>

<p>&nbsp;</p>

<div id="ferment" class="hidden">
<div><input type="text" class="form-control" id="ot" value=" "></div>
<div><input type="button" class="btn" value="FERMENT"/></div>
</div>


<p>&nbsp;</p>
<p><input type="button" class ="btn" id="logoutButton" value="Log Out"/></p>


</div> <!-- mainDiv -->