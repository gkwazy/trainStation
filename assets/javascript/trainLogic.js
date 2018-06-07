
var config = {
    apiKey: "AIzaSyB7B1ZK8f-7lHjGrwlQjIFedx9M2ezTbdI",
    authDomain: "timesheet-45ef0.firebaseapp.com",
    databaseURL: "https://timesheet-45ef0.firebaseio.com",
    projectId: "timesheet-45ef0",
    storageBucket: "timesheet-45ef0.appspot.com",
    messagingSenderId: "1077369831779"
};
firebase.initializeApp(config);

var database = firebase.database();


//initial values
var name;
var destination;
var firstTrainTime;
var frequency;
var minutesAway;

$(".submitButton").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    console.log("the stuff " + name + destination + firstTrainTime + frequency);
    var currentTime = moment().format(`HH:mm`)
    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: currentTime,
    });
    $("#trainName").val('');
    $("#destination").val('');
    $("#firstTrainTime").val('');
    $("#frequency").val('');

});

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().dataAdded);

    $("#employeeTable").append("<tr> <td scope=col >" +
        (snapshot.val().name) + " </td> <td scope=col> " +
        (snapshot.val().destination) + " </td> <td scope=col >" +
        (snapshot.val().frequency) + " </td> <td scope=col >" +
        timeSetUp((moment().format(`HH:mm`)), snapshot.val().firstTrainTime,
            snapshot.val().frequency) + "</td> <td scope=col>" +
        (minutesAway) + " minutes  </td> </tr>")
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

function timeSetUp(currentTime, firstTrainTime, frequency) {
    var trainTime = currentTime.split(":");
    console.log("trainTime:" + trainTime);
    var startTime = firstTrainTime.split(":");
    var arrival;
    console.log(trainTime[0] + " the minutes are " + trainTime[1]);
    var timeInMinutes = parseInt((trainTime[0] * 60) + parseInt(trainTime[1]));
    console.log("startTime[0]:" + startTime[0] + ", startTime[1]:" + startTime[1])
    var startTimeMinutes = parseInt((startTime[0] * 60) + parseInt(startTime[1]));
    console.log("startTimeMinutes:" + startTimeMinutes);
    var i = startTimeMinutes;
    var counter = 0;
    if (i > timeInMinutes) {
        arrival = startTimeMinutes;
        minutesAway = startTimeMinutes - timeInMinutes;
    } else {
        if (i <= timeInMinutes) {
            while (i <= timeInMinutes) {
                i = parseInt(i) + parseInt(frequency);
                arrival = i;
                minutesAway = arrival - timeInMinutes;
            }
        }
    }
    trainTime[0] = Math.floor(arrival / 60);
    trainTime[1] = arrival % 60;
    console.log(trainTime[0] + ":" + trainTime[1])
    return trainTime[0] + ":" + trainTime[1];
}