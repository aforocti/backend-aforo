/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Operaciones para los usuarios.
 */

const { Router } = require('express')
const router = Router();
const admin = require('firebase');
const db = admin.firestore();

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Se crea un nuevo usuario en el sistema.
 *      tags: [Users]
 *      responses:
 *          '200':
 *              description: Se han creado un nuevo usuario del sistema.
 *          '500':
 *              description: Hubo un error al crear un nuevo usuario en el sistema.
 */
router.post('/api/users', (req, res) => {
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
});

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Lee todos los usuarios del sistema.
 *      tags: [Users]
 *      responses:
 *          '200':
 *              description: Se han leido todos los usuarios del sistema.
 *          '500':
 *              description: Hubo un error al leer los usuarios del sistema.
 */
 router.get('/api/users', (req, res) => {
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
 });

/**
 * @swagger
 * /api/network/:network_id/users:
 *  get:
 *      summary: Lee los usuarios conectados a una red.
 *      tags: [Users]
 *      responses:
 *          '200':
 *              description: Se han leido todos los usuarios de la red.
 *          '500':
 *              description: Hubo un error al leer los usuarios de la red.
 */
router.get('/api/network/:network_id/users', (req, res) => {
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
});

/**
 * @swagger
 * /api/name/:name/users:
 *  get:
 *      summary: Lee un usuario y su red a partir de su nombre.
 *      tags: [Users]
 *      responses:
 *          '200':
 *              description: Se han leido el usuario correctamente.
 *          '500':
 *              description: Hubo un error al leer el usuario.
 */
router.get('/api/name/:name/users', (req, res) => {
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
});

// // Delete User
// router.delete('/api/users/:mac', (req, res) => {
//     (async () => {
//         try {
//             const doc = db.collection('Users').doc(req.params.mac);
//             await doc.delete();
//             return res.status(200).json();
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error)
//         }
//     })();
// });

// // Update User
// router.put('/api/users/:mac', (req, res) => {
//     (async () => {
//         try {
//             const doc = db.collection('Users').doc(req.params.mac);
//             await doc.update({
//                 manufacturer_name: req.body.manufacturer_name,
//                 product_name:      req.body.product_name
//             });
//             return res.status(200).json();
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error)
//         }
//     })();
// });

module.exports = router