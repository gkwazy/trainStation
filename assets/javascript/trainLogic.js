
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


$(".submitButton").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    console.log("the stuff " + name + destination + firstTrainTime + frequency);

    database.ref().push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
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
        (snapshot.val().firstTrainTime) + " </td> <td scope=col >" +
        " N/A " + " </td> <td scope=col>" +
        (snapshot.val().frequency) + " </td> <td scope=col> " +
        " N/A " + " </td> <td scope=col>" + " </tr>")
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});