/**
 * @swagger
 * tags:
 *  name: Images
 *  description: Operaciones para el almacenamiento de url de imagenes.
 */
const { Router } = require('express')
const router = Router();
const admin = require('firebase');
const db = admin.firestore();

/**
 * @swagger
 * /api/network/:network_id/images:
 *  post:
 *      summary: Se añade el url de la imagen del plano de una red.
 *      tags: [Images]
 *      responses:
 *          '200':
 *              description: Se ha agregado la url de la imagen.
 *          '500':
 *              description: Hubo un error al agregar la url de la imagen.
 */
router.post('/api/network/:network_id/images', async (req, res) => {
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
});


/**
 * @swagger
 * /api/network/:network_id/images:
 *  get:
 *      summary: Lee las imagenes de una red.
 *      tags: [Images]
 *      responses:
 *          '200':
 *              description: Se han leido todas las imagenes de la red.
 *          '500':
 *              description: Hubo un error al leer las imagenes de la red.
 */
router.get('/api/network/:network_id/images', (req, res) => {
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
});

/**
 * @swagger
 * /api/network/:network_id/images/:piso:
 *  get:
 *      summary: Lee las imagenes de una red en un piso determinado.
 *      tags: [Images]
 *      responses:
 *          '200':
 *              description: Se han leido la imagen correctamente.
 *          '500':
 *              description: Hubo un error al leer la imagen.
 */
router.get('/api/network/:network_id/images/:piso', (req, res) => {
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
});

/**
 * @swagger
 * /api/network/:network_id/images/url:
 *  get:
 *      summary: Actualiza la url de la imagen del plano de la red en un piso determinado.
 *      tags: [Images]
 *      responses:
 *          '200':
 *              description: Se ha actualizado la url de la imagen correctamente.
 *          '500':
 *              description: Hubo un error al actualizar la imagen.
 */
router.put('/api/network/:network_id/images/url', (req, res) => {
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
});



module.exports = router