
const admin = require('firebase-admin');
const db = admin.firestore();

exports.create = async (req, res) => {
    (async () => {
        try {
            await db.collection('Devices').doc().set({
                device_token : req.body.device_token,
                network_id   : req.body.network_id
            })
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.delete = (req, res) => {
    (async () => {
        try {
            var query = db.collection('Devices')
                          .where('device_token','==',req.params.device_token)
                          .get().then( ( querySnapshot ) => 
                                querySnapshot.forEach( ( doc ) => doc.ref.delete()));
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};