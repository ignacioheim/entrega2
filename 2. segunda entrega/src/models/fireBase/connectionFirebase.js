const admin = require("firebase-admin");

const serviceAccount = require("./db/segunda-entrega-eb206-firebase-adminsdk-l13wv-edce101d8a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://segunda-entrega-eb206.com"
});

console.log('Base de datos conectada!');

module.exports = {admin}

