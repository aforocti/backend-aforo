
const admin = require('firebase-admin');

const db = admin.firestore();

exports.create = async (req, res) => {
    generatedtoken = Math.random().toString(36).substr(2);
    (async () => {
        try {
            await db.collection('Networks').doc('/' + generatedtoken + '/').set({
                name: req.body.name,
                capacity: req.body.capacity
            })  
            const doc = db.collection('Networks').doc(generatedtoken);
            const item = await doc.get();
            const response = {
                id: item.id, 
                name: item.data().name,
                capacity: item.data().capacity
            }
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};

exports.findOne= (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Networks').doc(req.params.token);
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

exports.findAll = (req, res) => {
    (async () => {
        try {
            const query = db.collection('Networks');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                capacity: doc.data().capacity
            }))
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};