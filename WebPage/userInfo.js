// Initialize Firebase
var config = {
    apiKey: "==========",
    authDomain: "=======",
    databaseURL: "===========",
    projectId: "========",
    storageBucket: "===========",
    messagingSenderId: "========"
};
firebase.initializeApp(config);
6
  //referance message collection
var userDataRef=firebase.database().ref('userData');

  //listen to submit
document.getElementById('inputForm').addEventListener('submit',submitForm);

//get values
function submitForm(e){
    e.preventDefault();

    var name=getInputVal('name');
    var address=getInputVal('address');
    var mobileNumber=getInputVal('mobileNumber');
    var carNumber=getInputVal('carNumber');
    var chasisNumber=getInputVal('chasisNumber');

    saveMessage(name,address,mobileNumber,carNumber,chasisNumber);
    alert("Press OK to Continue");
    firebase.auth().signInWithPhoneNumber(mobileNumber, appVerifier);
}
//save function to get values
function getInputVal(id){
    return document.getElementById(id).value;
}
//save message to firebase
function saveMessage(name,address,mobileNumber,carNumber,chasisNumber)
{
    var user = userDataRef.push();
    user.set({
        "name":name,
        "address":address,
        "mobilenumber":mobileNumber,
        "carNumber":carNumber,
        "chasisNumber":chasisNumber
    });
}
