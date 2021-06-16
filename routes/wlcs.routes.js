/**
 * @swagger
 * tags:
 *  name: Wlcs
 *  description: Operaciones para los Wireless Controller
 */
const { Router } = require('express')
const router = Router();
const admin = require('firebase');
const db = admin.firestore();

/**
 * @swagger
 * /api/wlcs:
 *  post:
 *      summary: Se crea un nuevo Wireless Controller en una red.
 *      tags: [Wlcs]
 *      responses:
 *          '200':
 *              description: Se han creado un nuevo Wireless Controller en la red.
 *          '500':
 *              description: Hubo un error al crear un nuevo Wireless Controller en la red.
 */
router.post('/api/wlcs', (req, res) => {
    (async () => {
        try {
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
});

/**
 * @swagger
 * /api/wlcs:
 *  get:
 *      summary: Se leen todos los Wireless Controller.
 *      tags: [Wlcs]
 *      responses:
 *          '200':
 *              description: Se han leido todos los Wireless Controllers del sistema.
 *          '500':
 *              description: Hubo un error al leer los Wireless Controllers del sistema.
 */
router.get('/api/wlcs', (req, res) => {
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
});

/**
 * @swagger
 * /api/network/:network_id/wlcs:
 *  get:
 *      summary: Se leen todos los Wireless Controller de una red determinada.
 *      tags: [Wlcs]
 *      responses:
 *          '200':
 *              description: Se han leido todos los Wireless Controllers de la red.
 *          '500':
 *              description: Hubo un error al leer los Wireless Controllers de la red.
 */
router.get('/api/network/:network_id/wlcs', (req, res) => {
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
});

/**
 * @swagger
 * /api/wlc/:wlc_id:
 *  get:
 *      summary: Se lee la informacion de un wlc a partir de su id.
 *      tags: [Wlcs]
 *      responses:
 *          '200':
 *              description: Se ha leido la informacion del wlc correctamente.
 *          '500':
 *              description: Hubo un error al leer la informacion del wlc.
 */
router.get('/api/wlc/:wlc_id', (req, res) => {
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
});

/**
 * @swagger
 * /api/wlcs/:mac:
 *  delete:
 *      summary: Se elimina un wlc a partir de su mac adress.
 *      tags: [Wlcs]
 *      responses:
 *          '200':
 *              description: Se ha eliminado el wireless controller correctamente.
 *          '500':
 *              description: Hubo un error al eliminar el wireless controller.
 */
router.delete('/api/wlcs/:mac', (req, res) => {
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
});

/**
 * @swagger
 * /api/wlcs/:mac:
 *  update:
 *      summary: Se actualiza la informacion de un wlc.
 *      tags: [Wlcs]
 *      responses:
 *          '200':
 *              description: Se ha actualizado la informacion del wlc correctamente.
 *          '500':
 *              description: Hubo un error al actualizar la informacion del wlc.
 */
router.put('/api/wlcs/:mac', (req, res) => {
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
});

module.exports = router