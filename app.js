const express = require('express');
const admin = require('firebase');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        components: {},
        info: {
            title: 'Backend App Aforo',
            description: 'Backend de la aplicacion de control de aforo.',
            version: '1.0.0'
        },
        servers: [{
            url: 'https://localhost:3000',
            description: 'Development Server'
        },
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

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

app.use(require('./routes/networks.routes'))
app.use(require('./routes/wlcs.routes'))
app.use(require('./routes/users.routes'))
app.use(require('./routes/aps.routes'))
app.use(require('./routes/devices.routes'))
app.use(require('./routes/images.routes'))
app.use(require('./routes/alerts.routes'))
module.exports = app