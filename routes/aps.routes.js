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
const apsController = require('../controllers/aps.controller.js');

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
 *  get:
 *      summary: Lee todos los Access Point de la base.
 *      tags: [Aps]
 *      responses:
 *          '200':
 *              description: Se han leido todos los Access Points exitosamente.
 *          '500':
 *              description: Existió leyendo los Access Points.
 */
 router.get('/api/aps', apsController.findAll);

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
 router.get('/api/aps/:ap_id', apsController.findOne);
 
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
 router.get('/api/wlc/:wlc_id/aps', apsController.findByAp);
 
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
 router.get('/api/network/:network_id/aps', apsController.findByNetwork);

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
router.post('/api/aps', apsController.create);

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
router.put('/api/aps/:mac/model/name', apsController.updateModelName);

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
router.put('/api/aps/:mac/limit/piso', apsController.updateLimitPiso);

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
router.put('/api/aps/:mac/devices', apsController.updateDevices);

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
router.put('/api/aps/:mac/dxdy', apsController.updateLocation);

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
router.put('/api/aps/:mac/active', apsController.updateActive);

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
 router.delete('/api/aps/:mac', apsController.delete);

 router.put('/api/aps/guardar/:id', apsController.guardar);

module.exports = router