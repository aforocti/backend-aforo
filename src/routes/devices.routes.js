const { Router } = require('express')
const router = Router();
const admin = require('firebase');
const db = admin.firestore();

router.post('/api/devices', async (req, res) => {
    (async () => {
        console.log("token:"+req.body.device_token)
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
});

router.delete('/api/devices/:device_token', (req, res) => {
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
});

module.exports = router