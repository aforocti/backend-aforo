const express = require('express');
const admin = require('firebase');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const functions = require('firebase-functions');

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
            url: 'https://backend-aforo.herokuapp.com',
            description: 'Production Server'
        },{
            url: 'http://localhost:3000',
            description: 'Development Server'
        }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

admin.initializeApp(config.firebaseConfig);

var newData;

app.use(require('./routes/networks.routes'))
app.use(require('./routes/wlcs.routes'))
app.use(require('./routes/users.routes'))
app.use(require('./routes/aps.routes'))
app.use(require('./routes/devices.routes'))
app.use(require('./routes/images.routes'))
app.use(require('./routes/alerts.routes'))
module.exports = app