/**
 * @swagger
 * tags:
 *  name: Devices
 *  description: Operaciones para los Dipositivos.
 */
const { Router } = require('express')
const router = Router();
const devicesController = require('../controllers/devices.controller.js');


/**
 * @swagger
 * components:
 *  schemas:
 *      device:
 *          type: object
 *          properties:
 *              device_token:
 *                  type: string
 *                  description: Token del dispositivo.
 *              network_id:
 *                  type: string
 *                  description: Id de la red.
 */

/**
 * @swagger
 * /api/devices:
 *  post:
 *      summary: Se crea un nuevo dispositivo en una red a partir de un id de red y un token de dipositivo.
 *      tags: [Devices]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/device'
 *      responses:
 *          '200':
 *              description: Se ha un nuevo dispositivo en la red.
 *          '500':
 *              description: Hubo un error al crear el nuevo dispositivo en la red.
 */
router.post('/api/devices', devicesController.create);

/**
 * @swagger
 * /api/devices/:device_token:
 *  delete:
 *      summary: Se elimina un dispositivo a partir del Token del dispositivo.
 *      tags: [Devices]
 *      parameters:
 *        - in: path
 *          name: device_token
 *          schema:
 *              type: string
 *          required: true
 *          description: Token del dispositivo.
 *      responses:
 *          '200':
 *              description: Se ha eliminad el dispositivo.
 *          '500':
 *              description: Hubo un error al eliminar el dispositivo.
 */
router.delete('/api/devices/:device_token', devicesController.delete);

module.exports = router