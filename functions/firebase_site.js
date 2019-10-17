var firebase = require("firebase-admin");
var serviceAccount = require("./secrets/firebase-sa.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://blog-menu.firebaseio.com"
});

module.exports = firebase