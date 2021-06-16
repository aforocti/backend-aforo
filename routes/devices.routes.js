/**
 * @swagger
 * tags:
 *  name: Devices
 *  description: Operaciones para los Dipositivos.
 */
const { Router } = require('express')
const router = Router();
const admin = require('firebase');
const db = admin.firestore();

/**
 * @swagger
 * /api/devices:
 *  post:
 *      summary: Se crea un nuevo dispositivo en una red a partir de un id de red y un token de dipositivo.
 *      tags: [Devices]
 *      responses:
 *          '200':
 *              description: Se ha un nuevo dispositivo en la red.
 *          '500':
 *              description: Hubo un error al crear el nuevo dispositivo en la red.
 */
router.post('/api/devices', async (req, res) => {
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
});

/**
 * @swagger
 * /api/devices/:device_token:
 *  delete:
 *      summary: Se elimina un dispositivo a partir del Token del dispositivo.
 *      tags: [Devices]
 *      responses:
 *          '200':
 *              description: Se ha eliminad el dispositivo.
 *          '500':
 *              description: Hubo un error al eliminar el dispositivo.
 */
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