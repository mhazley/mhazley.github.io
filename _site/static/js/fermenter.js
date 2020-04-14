// You need a Particle object to call the API. Make sure your html file loads the js file for the API.
var particle = new Particle();

// Global variables
var particleAccessToken;
var deviceId;

$(document).ready(function() {
	initPage();
});

function initPage() {
	// Hook up handlers using jquery
	$('#loginButton').on('click', loginButtonHandler);
	// $('#logoutButton').on('click', logoutButtonHandler);
	$('#statusButton').on('click', getStatusButtonHandler);
	
	// Read the access token from a browser cookie, if we can. This uses js-cookie.js, which is much
	// easier than coding for each browser quirk you might encounter.
	
	// Note: We don't store the actual username and password, but the access token that has a limited
	// lifetime and is less sensitive. You may not even want to save the particleAccessToken at all, but for
	// this test program it's helpful because it eliminates the need to type in your username and 
	// password every time you reload the page.
	particleAccessToken = Cookies.get('particleAccessToken'); 
	if (particleAccessToken == undefined || particleAccessToken == '') {
		// Show the login page
		$('#loginDiv').show();
	}
	else {
		// We have an access token, so show the main page. Note that the access token
		// may be expired, but we'll only find that out the first time we try to use it, when
		// we update the device list.
		$('#mainDiv').show();
		updateDeviceList();		
	}
}

function getStatusButtonHandler(event) {
    $('#statusButton').attr('disabled', 'disabled');

    particle.getVariable({ deviceId: deviceId, name: 'get_status', auth: particleAccessToken }).then(function(data) {
        console.log('Device variable retrieved successfully:', data);
        var status = jQuery.parseJSON( data.body.result );
        if (status.mode === "running") {
            if (status.h) {
                $('#statusLabel').val("HEATING")
                $('#statusLabel').attr('class', 'btn btn-danger');
            } else if (status.c) {
                $('#statusLabel').val("COOLING")
                $('#statusLabel').attr('class', 'btn btn-info');
            } else {
                $('#statusLabel').val("RUNNING")
                $('#statusLabel').attr('class', 'btn');
            } 
        } else {
            $('#statusLabel').val("IDLE")
            $('#statusLabel').attr('class', 'btn');
        }

        $('#sp').val(status.sp)
        $('#tt').val(status.tt)
        $('#at').val(status.at)
        $('#ot').val(status.ot)

        $('#statusButton').removeAttr('disabled');
    }, function(err) {
        console.log('An error occurred while getting attrs:', err);
        $('#statusButton').removeAttr('disabled');
    });
    
    // This prevents the Submit button from trying to change the page we're on.
	event.preventDefault();
}

// The login button has been clicked
function loginButtonHandler(event) {
	// Disable the login button so it can't be clicked twice.
	$('#loginButton').attr('disabled', 'disabled');
	
	// Get the username and password from the web page, then clear the password field.
	var user = $('#loginUser').val();
	var pass = $('#loginPass').val();
	$('#loginPass').val('');
	
	console.log('loginButtonHandler user=' + user + "pass=<hidden>");
	
	particle.login({username:user, password:pass}).then(
		function(data) {
			// Executed if login completes successfully
			particleAccessToken = data.body.access_token;
			console.log("particleAccessToken=" + particleAccessToken);
			
			// Save in a browser cookie that expires in 7 days
			Cookies.set('particleAccessToken', particleAccessToken, { expires: 7 });
			
			// Reenable the login button
			$('#loginButton').removeAttr('disabled');
						
			// Hide all of the login related things and error messages and show the mainDiv.
			$('#loginFailureDiv').hide();
			$('#apiFailureDiv').hide();
			$('#loginDiv').hide();
			$('#mainDiv').show();
			updateDeviceList();
		},
		function(err) {
			// Failure to log in. Probably an invalid password. Could possibly be another
			// error from the server; you might want to check for that in a real app.
			console.log('login failed ', err);
			$('#loginButton').removeAttr('disabled');
			$('#apiFailureDiv').hide();
			$('#loginFailureDiv').show();
		}		
	);
	
	// Note that when this code is executed, the login operation hasn't completed yet.
	// The code in the then() expression is what gets executed later, when the login
	// actually completes.
	
	// This prevents the Submit button from trying to change the page we're on.
	event.preventDefault();
}

// This function is called to update the popup menu of devices
function updateDeviceList() {
	
	// Use the listDevices API 
	particle.listDevices({ auth: particleAccessToken }).then(
		function(devices) {
			for(var ii = 0; ii < devices.body.length; ii++) {
				var dev = devices.body[ii];
				console.log("dev ii=" + ii, dev);
				
				// The entries that come back have the following things in dev:
				// cellular: false
				// connected: true
				// id: "<yourdeviceid>"
				// last_app: null
				// last_heard: "2016-03-18T18:11:36.183Z"
				// last_ip_address: "<youripaddress>"
				// name: "test4"
				// platform_id: 6
				// product_id: 6
				// status: "normal"
				
                if (dev.name === "geometry-fermenter") {
                    if (dev.connected) {
                        deviceId = dev.id
                        console.log("Fermenter is connected: ", deviceId);
                        $('#disconnected').hide();
                        $('#connected').show();
                        $('#status').show();
                        $('#ferment').show();
                    }
                    else {
                        console.log("Fermenter is disconnected.");
                        $('#connected').hide();
                        $('#disconnected').show();
                    }
                }
			}
			// If we selected a device in lastDeviceId, load the initial state now
			// deviceSelectChange();
		},	
		function(err) {
			// This can happen when a saved access token has expired. If so, remove the saved
			// access token and display the login page.
			console.log('listDevices failed ', err);
			accessTokenErrorHandler();
		}
	);
}

// This happens when our access token expires. Display the login screen, and API failure message, and 
// remove the access token cookie. Leave the selected device ID cookie, since the token probably just
// expired.
function accessTokenErrorHandler() {
	$('#mainDiv').hide();
	$('#loginDiv').show();
	$('#apiFailureDiv').show();
	particleAccessToken = '';
	Cookies.remove('particleAccessToken');
}
