var deviceID = "3e0038000747343232363230";
var accessToken = "27cc0e25e9d4726d6c96f3e2ec6c2ec6a3ff8e93";
var funcName = "route";

EventEnum = {
    TEMPERATURES : "geometry.fermenter.temperature",
}

TempRolesEnum = {
    CHAMBER_TEMP : {output: "chamber_temp"},
}

$(document).ready(function() {
    if (accessToken == "" || deviceID == "") {
        alert("Please open index.js and input a valid 'accessToken' and 'deviceID'.");
        window.close();
    }

    spark.login({accessToken: accessToken});
    spark.getEventStream(false, deviceID, function(data) {
        switch (data.name) {
            case EventEnum.TEMPERATURES:
                outputTemperature(data.data);
                break;
        }
    });
});

function outputTemperature(value) {
    var temp = parseFloat(value);
    temp = temp / 100;
    setInput(TempRolesEnum.CHAMBER_TEMP.output, temp);
}


function setInput(inputName, value) {
    console.log(inputName)
    console.log(value)
    document.getElementById(inputName).innerHTML = value;
    //$("#" + inputName).HTML = value;
}
