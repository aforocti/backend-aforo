const admin = require('firebase');
const db = admin.firestore();

exports.create = async (req, res) => {
    (async () => {
        try {
            await db.collection('Networks').doc(req.params.network_id)
                    .collection('Images').doc('/' + req.body.piso + '/')
                    .set({
                        url: req.body.url
                    })
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};


exports.findbyNetwork = (req, res) => {
    (async () => {
        try {
            const query = db.collection('Networks').doc(req.params.network_id)
                            .collection('Images')
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                url:  doc.data().url,
                piso: doc.id
            }))
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.findByPiso = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Networks').doc(req.params.network_id)
                          .collection('Images').doc(req.params.piso);
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

exports.update = (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Networks').doc(req.params.network_id)
                          .collection('Images').doc(req.body.piso);
            await doc.update({
                url: req.body.url,
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};