
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const db = admin.firestore();

exports.create = async (req, res) => {
    today = new Date()
    time = today.getHours() + ":" + today.getMinutes() 
            + ":" + today.getSeconds() ;
    (async () => {
        alerta = {
            network_id: req.body.network_id,
            area: req.body.area,
            hour: req.body.hour,
            serverhour: time,
            date: req.body.date,
            device_number: req.body.device_number
        };
        try {
            await db
                .collection('Alerts').doc()
                .set(alerta);
            sendAlert(alerta);
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.findAll = (req, res) => {
    (async () => {
        try {
            const query = db.collection('Alerts').where("network_id", "==", req.params.network_id);
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                id: doc.id,
                area: doc.data().area,
                hour: doc.data().hour,
                date: doc.data().date,
                device_number: doc.data().device_number
            }))
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.delete = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Networks').doc(req.body.network_id)
                .collection('Alerts').doc(req.params.id)
            await doc.delete();
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.update = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Networks').doc(req.body.network_id)
                .collection('Alerts').doc(req.params.id);
            await doc.update({
                description: req.body.description,
                hour: req.body.hour,
                date: req.body.date
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};


sendAlert = async (alerta) => {
    var regTokens = [];

    const deviceTokens = await admin
        .firestore()
        .collection('Devices')
        .where("network_id", "==", alerta.network_id)
        .get();

    for (var token of deviceTokens.docs) {
        regTokens.push(token.data().device_token);
    }
    var payload = {
        notification: {
            title: 'ALERT!',
            body: `A crowd of people has been detected at ${alerta.area}`,
            sound: 'default'
        },
        data: {
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            message: `area: ${alerta.area}, hour: ${alerta.hour}, date: ${alerta.date}, device_number: ${alerta.device_number}`
        },
        registration_ids: regTokens
    }
    try {
        fetch('https://fcm.googleapis.com/fcm/send', {
            'method': 'POST',
            'headers': {
                'Authorization': 'key=' + 'AAAAUWDjsbo:APA91bEcfnfywZDzahLOMtt5Sx-5f8SPHnbxFhMDxdzWSbOK9qRAd6ilz75tYYRaj6hDGooUs0Hj3rLnwwOxZkKLFv9aWY3utR1Fhop4YVk-Zg4ijjUMrLw4WgbNs15-c_HxaIIL2DBm',
                'Content-Type':'application/json'
            },
            'body':JSON.stringify(payload)
        }).then (()=>{
            console.log("sended!")
        }).catch((err)=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error)
    }
}