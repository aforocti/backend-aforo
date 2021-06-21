const admin = require('firebase');
const db = admin.firestore();

exports.create = (req, res) => {
    (async () => {
        console.log("body:"+req.body.user)
        try {
            await db
                .collection('Users').doc().set({
                    user:       req.body.user,
                    network_id: req.body.network_id,
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
             const query = db.collection('Users');
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
            const query = db.collection('Users').where("network_id", "==", req.params.network_id);
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                id:         doc.id,
                network_id: doc.data().network_id,
                user:       doc.data().user,
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
            const query = db.collection('Users').where("user", "==", req.params.name);
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                network_id: doc.data().network_id,
                user:       doc.data().user,
            }))
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
};