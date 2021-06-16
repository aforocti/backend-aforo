/**
 * @swagger
 * tags:
 *  name: Networks
 *  description: Operaciones para las redes.
 */

const { Router } = require('express')
const router = Router();
const admin = require('firebase');
const db = admin.firestore();

/**
 * @swagger
 * /api/networks:
 *  post:
 *      summary: Crear una red y genera un token de red. 
 *      tags: [Networks] 
 *      responses:
 *          '200':
 *              description: Se ha creado una nueva red.
 *          '500':
 *              description: Hubo un error al crear la red.
 */
router.post('/api/networks', async (req, res) => {
    generatedtoken = Math.random().toString(36).substr(2);
    (async () => {
        try {
            await db.collection('Networks').doc('/' + generatedtoken + '/').set({
                name: req.body.name,
            })  
            const doc = db.collection('Networks').doc(generatedtoken);
            const item = await doc.get();
            const response = {
                id: item.id, 
                name: item.data().name
            }
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
});

/**
 * @swagger
 * /api/networks/:token:
 *  get:
 *      summary: Lee una red a partir de un token  
 *      tags: [Networks] 
 *      responses:
 *          '200':
 *              description: Se ha leido la informacion de la red correctamente.
 *          '500':
 *              description: Hubo un error al leer la informacion de la red.
 */
router.get('/api/networks/:token', (req, res) => {
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
});

/**
 * @swagger
 * /api/networks:
 *  get:
 *      summary: Lee las redes guardadas. 
 *      tags: [Networks] 
 *      responses:
 *          '200':
 *              description: Se han leido las redes guardadas.
 *          '500':
 *              description: Hubo un error al leer las redes.
 */
router.get('/api/networks', (req, res) => {
    (async () => {
        try {
            const query = db.collection('Networks');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
            }))
            return res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
});


module.exports = router