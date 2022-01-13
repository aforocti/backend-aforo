const admin = require('firebase-admin');

const db = admin.firestore();

exports.create = (req, res) => {
    (async () => {
        try {
            console.log(req.body)
            await db
                .collection('Wlcs').doc('/' + req.body.mac + '/')
                .set({
                    manufacturer_name: req.body.manufacturer_name,
                    network_id:        req.body.network_id,
                    product_name:      req.body.product_name
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
            const query = db.collection('Wlcs');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                mac:               doc.id,
                network_id:        doc.data().network_id,
                manufacturer_name: doc.data().manufacturer_name,
                product_name:      doc.data().product_name
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
            const query = db.collection('Wlcs').where("network_id", "==", req.params.network_id);
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                mac:               doc.id,
                network_id:        doc.data().network_id,
                manufacturer_name: doc.data().manufacturer_name,
                product_name:      doc.data().product_name
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
            const doc = db.collection('Wlcs').doc(req.params.wlc_id);
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

exports.delete = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Wlcs').doc(req.params.mac);
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
            const doc = db.collection('Wlcs').doc(req.params.mac);
            await doc.update({
                manufacturer_name: req.body.manufacturer_name,
                product_name:      req.body.product_name
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};