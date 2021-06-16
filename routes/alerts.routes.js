/**
 * @swagger
 * tags:
 *  name: Alerts
 *  description: Operaciones para las alertas.
 */

const { Router } = require('express')
const router = Router();
const admin = require('firebase');
const db = admin.firestore();

/**
 * @swagger
 * components:
 *  schemas:
 *      alert:
 *          type: object
 *          properties:
 *              network_id:
 *                  type: integer
 *                  description: Id de la red.
 *              area:
 *                  type: string
 *                  desciption: Area de la red
 *              hour:
 *                  type: string
 *                  description: Hora
 *              date:
 *                  type: string
 *                  description: Fecha
 *              device_number:
 *                  type: integer
 *                  description: Numero de dipositivo
 *          example:
 *              network_id: 24
 *              area: "Piso 1"
 *              hour: 24:03:02
 *              date: 24-06-2021
 *              device_number: 2
 */

/**
 * @swagger
 * 
 * /api/alerts:
 *    post:
 *      summary: Se crea una nueva alera.
 *      tags: [Alerts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/alert'
 *      responses:
 *          '200':
 *              description: Se creo una nueva alerta.
 *          '500':
 *              description: Hubo un problema al crear la nueva alerta.
 */
router.post('/api/alerts', async (req, res) => {
    (async () => {
        try {
            await db
                .collection('Alerts').doc()
                .set({
                    network_id: req.body.network_id,
                    area: req.body.area,
                    hour: req.body.hour,
                    date: req.body.date,
                    device_number: req.body.device_number
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
 * 
 * /api/network/{network_id}/alerts:
 *    get:
 *      summary: Lee todas las alertas por id de red.
 *      tags: [Alerts]
 *      parameters:
 *            - in: path
 *              name: network_id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Id de la red
 *      responses:
 *          '200':
 *              description: Se leyeron todas las alertas correctamente.
 *          '500':
 *              description: Hubo un error en el envio.
 */
router.get('/api/network/:network_id/alerts', (req, res) => {
    (async () => {
        try {
            const query = db.collection('Alerts').where("network_id", "==", req.params.network_id);
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                id: doc.id,
                area: doc.data().area,
                hour: doc.data().hour,
                date: doc.data().date,
                device_number: doc.data().device_number
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
 * /api/alerts/{id}:
 *  delete:
 *      summary: Elimina una alerta dentro de una red a partir de su id.
 *      tags: [Alerts]
 *      parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Id de la alerta.
 *      responses:
 *          '200':
 *              description: Se ha eliminado una alerta exitosamente.
 *          '500':
 *              description: Existio un error eliminando la alerta.
 */
router.delete('/api/alerts/:id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Networks').doc(req.body.network_id)
                .collection('Alerts').doc(req.params.id)
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
 * components:
 *  schemas:
 *      alertsUpdate:
 *          type: object
 *          properties:
 *              network_id:
 *                  type: integer
 *                  description: Id de la red.
 *              description:
 *                  type: string
 *                  description: Descripcion de la alerta
 *              hour:
 *                  type: string
 *                  description: Hora
 *              date:
 *                  type: string
 *                  description: Fecha
 *          example:
 *              network_id: 24
 *              description: Red 1
 *              hour: 24:03:02
 *              date: 24-06-2021
 */

/**
 * @swagger
 * 
 * /api/alerts/{id}:
 *    put:
 *      summary: Agrega una nueva alerta a partir de un id.
 *      tags: [Alerts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/alertsUpdate'
 *      parameters:
 *            - in: path
 *              name: id
 *              schema:
 *              type: string
 *              required: true
 *              description: Id de la alerta.
 *      responses:
 *          '200':
 *              description: Se agrego una alerta correctamente.
 *          '500':
 *              description: Hubo un error en el envio.
 */
router.put('/api/alerts/:id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Networks').doc(req.body.network_id)
                .collection('Alerts').doc(req.params.id);
            await doc.update({
                description: req.body.description,
                hour: req.body.hour,
                date: req.body.date
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
});

module.exports = router