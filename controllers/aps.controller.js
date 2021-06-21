const admin = require('firebase');
const db = admin.firestore();

exports.create = (req, res) => {
    (async () => {
        try {
            await db
                .collection('Aps').doc('/' + req.body.mac + '/')
                .set({
                    wlc_id  : req.body.wlc_id,
                    network_id : req.body.network_id,
                    name    : req.body.name,
                    model   : req.body.model,
                    piso    : '0',
                    devices : '0',
                    limit   : '10',
                    dx      : '0',
                    dy      : '0',
                    active  : '0'
                })
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
            const query = db.collection('Aps');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                mac        : doc.id,
                network_id : doc.data().network_id,
                wlc_id     : doc.data().wlc_id,
                model      : doc.data().model,
                name       : doc.data().name,
                piso       : doc.data().piso,
                devices    : doc.data().devices,
                limit      : doc.data().limit,
                dx         : doc.data().dx,
                dy         : doc.data().dy,
                active     : doc.data().active
            }))
            return res.status(200).json(response);   
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.findOne = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.ap_id);
            const item = await doc.get();
            const response = item.data();
            const exists = response !== undefined;
            return res.status(exists ? 200 : 400).json({
                success: exists,
                data: exists ? response : "not found"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.findByAp = (req, res) => {
    (async () => {
        try {
            const query = db.collection('Aps').where("wlc_id", "==", req.params.wlc_id);
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                mac        : doc.id,
                wlc_id     : doc.data().wlc_id,
                network_id : doc.data().network_id,
                model      : doc.data().model,
                name       : doc.data().name,
                piso       : doc.data().piso,
                devices    : doc.data().devices,
                limit      : doc.data().limit,
                dx         : doc.data().dx,
                dy         : doc.data().dy,
                active     : doc.data().active
            }))
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.findByNetwork = (req, res) => {
    (async () => {
        try {
            const query = db.collection('Aps').where("network_id", "==", req.params.network_id);
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                mac        : doc.id,
                wlc_id     : doc.data().wlc_id,
                network_id : doc.data().network_id,
                model      : doc.data().model,
                name       : doc.data().name,
                piso       : doc.data().piso,
                devices    : doc.data().devices,
                limit      : doc.data().limit,
                dx         : doc.data().dx,
                dy         : doc.data().dy,
                active     : doc.data().active
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
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.delete();
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.updateModelName = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.update({
                model: req.body.model,
                name : req.body.name
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.updateLimitPiso = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.update({
                limit : req.body.limit,
                piso  : req.body.piso
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.updateDevices = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.update({
                devices: req.body.devices,
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.updateLocation = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.update({
                dx: req.body.dx,
                dy: req.body.dy,
                
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.updateActive = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.update({
                active: req.body.active,
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};