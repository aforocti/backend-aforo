const express = require('express');
const admin = require('firebase');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());




admin.initializeApp(config.firebaseConfig);

var newData;

// push notifications application
/*exports.messageTrigger = functions.firestore.document('Alerts/{alertId}').onCreate(async (snapshot, context) => {
    if(snapshot.empty) {
        return;
    }
    var tokens = [];
    newData = snapshot.data();

    const deviceTokens = await admin
        .firestore()
        .collection('Devices')
        .where("network_id", "==", newData.network_id)
        .get();
    
    for(var token of deviceTokens.docs) {
        tokens.push(token.data().device_token);
    }
    var payload = {
        notification: {
            title: 'Alerta!', 
            body: `Se ha detectado aglomeración en ${newData.area}`, 
            sound: 'default'
        },
        data : {
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            message: `area: ${newData.area}, hour: ${newData.hour}, date: ${newData.date}, device_number: ${newData.device_number}`
        }
    }
    try {
        const response = await admin.messaging().sendToDevice(tokens, payload);
    } catch (error) {
        console.log(error)
    }
});*/

app.use(require('./src/routes/networks.routes'))
app.use(require('./src/routes/wlcs.routes'))
app.use(require('./src/routes/users.routes'))
app.use(require('./src/routes/aps.routes'))
app.use(require('./src/routes/devices.routes'))
app.use(require('./src/routes/images.routes'))
app.use(require('./src/routes/alerts.routes'))
module.exports = app