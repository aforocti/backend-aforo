/**
 * @swagger
 * tags:
 *  name: Aps
 *  description: Operaciones para los Access Points.
 */
const { Router } = require('express')
const router = Router();
const admin = require('firebase');
const db = admin.firestore();

/**
 * @swagger
 * components:
 *  schemas:
 *      aps:
 *          type: object
 *          properties:
 *              mac:
 *                  type: string
 *                  description: Mac Adress
 *              wlc_id:
 *                  type: string
 *                  desciption: Id del wireless controller
 *              name:
 *                  type: string
 *                  description: Nombre del AP
 *              model:
 *                  type: string
 *                  description: Modelo del AP
 *              piso:
 *                  type: string
 *                  description: Piso de la ubicacion del AP
 *              devices:
 *                  type: string
 *                  description: Cantidad de dipositivos
 *              limit:
 *                  type: string
 *                  description: Limite de dispositivo en el AP.
 *              dx:
 *                  type: string
 *                  description: Posicion x del AP en el plano del piso del edificio
 *              dy:
 *                  type: string
 *                  description: Posicion y del AP en el plano del piso del edificio.
 *              activ:
 *                  type: string
 *                  description: si esta o no activo.
 *          example:
 *              mac: asd123kj12lk4h
 *              wlc_id: 3
 *              network_id: 24
 *              name: AP 1
 *              model: Cisco 24 A
 *              piso: 3
 *              devices: 3
 *              limit: 10
 *              dx: 5.5
 *              dy: 4.5
 *              active: 1
 */

/**
 * @swagger
 * /api/aps:
 *  post:
 *      summary: Crear un nuevo Access Point en la base.
 *      tags: [Aps]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/aps'
 *      responses:
 *          '200':
 *              description: Se ha agregado un Access Point exitosamente.
 *          '500':
 *              description: Existió un error eliminando la alerta.
 */
router.post('/api/aps', (req, res) => {
    (async () => {
        try {
            await db
                .collection('Aps').doc('/' + req.body.mac + '/')
                .set({
                    wlc_id  : req.body.wlc_id,
                    network_id : req.body.network_id,
                    name    : req.body.name,
                    model   : req.body.model,
                    piso    : '0',
                    devices : '0',
                    limit   : '10',
                    dx      : '0',
                    dy      : '0',
                    active  : '0'
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
 * /api/aps:
 *  get:
 *      summary: Lee todos los Access Point de la base.
 *      tags: [Aps]
 *      responses:
 *          '200':
 *              description: Se han leido todos los Access Points exitosamente.
 *          '500':
 *              description: Existió leyendo los Access Points.
 */
router.get('/api/aps', (req, res) => {
    (async () => {
        try {
            const query = db.collection('Aps');
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                mac        : doc.id,
                network_id : doc.data().network_id,
                wlc_id     : doc.data().wlc_id,
                model      : doc.data().model,
                name       : doc.data().name,
                piso       : doc.data().piso,
                devices    : doc.data().devices,
                limit      : doc.data().limit,
                dx         : doc.data().dx,
                dy         : doc.data().dy,
                active     : doc.data().active
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
 * /api/aps/{ap_id}:
 *  get:
 *      summary: Lee la informacion de un Access Point especifico, a partir de su id.
 *      tags: [Aps]
 *      parameters:
 *            - in: path
 *              name: ap_id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Id del Access Point.
 *      responses:
 *          '200':
 *              description: Se ha leido el Access Point exitosamente.
 *          '500':
 *              description: Existió un al leer la informacion del Access Point.
 */
router.get('/api/aps/:ap_id', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.ap_id);
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
 * /api/wlc/{wlc_id}/aps:
 *  get:
 *      summary: Lee todos los Access Point conectados a un Wireless Controller a partir del id del WLC.
 *      tags: [Aps]
 *      parameters:
 *            - in: path
 *              name: wlc_id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Id del Wireless Controller.
 *      responses:
 *          '200':
 *              description: Se han leido los Access Points exitosamente.
 *          '500':
 *              description: Existió un al leer los Access Points.
 */
router.get('/api/wlc/:wlc_id/aps', (req, res) => {
    (async () => {
        try {
            const query = db.collection('Aps').where("wlc_id", "==", req.params.wlc_id);
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                mac        : doc.id,
                wlc_id     : doc.data().wlc_id,
                network_id : doc.data().network_id,
                model      : doc.data().model,
                name       : doc.data().name,
                piso       : doc.data().piso,
                devices    : doc.data().devices,
                limit      : doc.data().limit,
                dx         : doc.data().dx,
                dy         : doc.data().dy,
                active     : doc.data().active
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
 * /api/network/{network_id}/aps:
 *  get:
 *      summary: Lee todos los Access Point conectados a una red a partir del id de la red.
 *      tags: [Aps]
 *      parameters:
 *            - in: path
 *              name: network_id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Id de la red.
 *      responses:
 *          '200':
 *              description: Se han leido los Access Points exitosamente.
 *          '500':
 *              description: Existió un al leer los Access Points.
 */
router.get('/api/network/:network_id/aps', (req, res) => {
    (async () => {
        try {
            const query = db.collection('Aps').where("network_id", "==", req.params.network_id);
            const querySnapshot = await query.get();
            const docs = querySnapshot.docs;
            const response = docs.map(doc => ({
                mac        : doc.id,
                wlc_id     : doc.data().wlc_id,
                network_id : doc.data().network_id,
                model      : doc.data().model,
                name       : doc.data().name,
                piso       : doc.data().piso,
                devices    : doc.data().devices,
                limit      : doc.data().limit,
                dx         : doc.data().dx,
                dy         : doc.data().dy,
                active     : doc.data().active
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
 * /api/aps/{mac}:
 *  delete:
 *      summary: Elimina un Access Point a partir de su Mac Adress.
 *      tags: [Aps]
 *      parameters:
 *            - in: path
 *              name: mac
 *              schema:
 *                  type: string
 *              required: true
 *              description: Mac Adress del Access Point.
 *      responses:
 *          '200':
 *              description: Se ha eliminado el Access Point correctamente.
 *          '500':
 *              description: Existió un al eliminar el Access Point.
 */
router.delete('/api/aps/:mac', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
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
 * /api/aps/{mac}/model/name:
 *  put:
 *      summary: Actualiza el model y el nombre de un Access Point.
 *      tags: [Aps]
 *      parameters:
 *            - in: path
 *              name: mac
 *              schema:
 *                  type: string
 *              required: true
 *              description: Mac Adress del Access Point.
 *      responses:
 *          '200':
 *              description: Se actualizo la información del Access Point correctamente.
 *          '500':
 *              description: Existió un problema al actualizar la información del Access Point.
 */
router.put('/api/aps/:mac/model/name', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.update({
                model: req.body.model,
                name : req.body.name
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
});

/**
 * @swagger
 * /api/aps/{mac}/limit/piso:
 *  put:
 *      summary: Actualiza el limite y el piso de un Access Point para la medición de aforo.
 *      tags: [Aps]
 *      parameters:
 *            - in: path
 *              name: mac
 *              schema:
 *                  type: string
 *              required: true
 *              description: Mac Adress del Access Point.
 *      responses:
 *          '200':
 *              description: Se actualizo la información del Access Point correctamente.
 *          '500':
 *              description: Existió un problema al actualizar la información del Access Point.
 */
router.put('/api/aps/:mac/limit/piso', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.update({
                limit : req.body.limit,
                piso  : req.body.piso
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
});

/**
 * @swagger
 * /api/aps/{mac}/devices:
 *  put:
 *      summary: Actualiza los dispositivos conectados a un Access Point.
 *      tags: [Aps]
 *      parameters:
 *            - in: path
 *              name: mac
 *              schema:
 *                  type: string
 *              required: true
 *              description: Mac Adress del Access Point.
 *      responses:
 *          '200':
 *              description: Se actualizaron los dispositivos del Access Point.
 *          '500':
 *              description: Existió un problema al actualizar los dispositivos del Access Point.
 */
router.put('/api/aps/:mac/devices', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.update({
                devices: req.body.devices,
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
});

/**
 * @swagger
 * /api/aps/{mac}/dxdy:
 *  ´put:
 *      summary: Actualiza la posicion en el plano de un Access Point.
 *      tags: [Aps]
 *      parameters:
 *            - in: path
 *              name: mac
 *              schema:
 *                  type: string
 *              required: true
 *              description: Mac Adress del Access Point.
 *      responses:
 *          '200':
 *              description: Se actualizó la posición del Access Point.
 *          '500':
 *              description: Existió un problema al actualizar la posición del Access Point.
 */
router.put('/api/aps/:mac/dxdy', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.update({
                dx: req.body.dx,
                dy: req.body.dy,
                
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
});

/**
 * @swagger
 * /api/aps/{mac}/active:
 *  ´put:
 *      summary: Nose.
 *      tags: [Aps]
 *      parameters:
 *            - in: path
 *              name: mac
 *              schema:
 *                  type: string
 *              required: true
 *              description: Mac Adress del Access Point.
 *      responses:
 *          '200':
 *              description: Se actualizó la posición del Access Point.
 *          '500':
 *              description: Existió un problema al actualizar la posición del Access Point.
 */
router.put('/api/aps/:mac/active', (req, res) => {
    (async () => {
        try {
            const doc = db.collection('Aps').doc(req.params.mac);
            await doc.update({
                active: req.body.active,
            });
            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    })();
});

module.exports = router