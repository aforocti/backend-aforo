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
const wlcsController = require('../controllers/wlcs.controller.js');

/**
 * @swagger
 * components:
 *  schemas:
 *      wlc:
 *          type: object
 *          properties:
 *              manufacter_name:
 *                  type: string
 *                  description: Nombre del proveedor.
 *              network_id:
 *                  type: string
 *                  description: Id de la red.
 *              product_name:
 *                  type: string
 *                  description: Nombre del producto.
 */

/**
 * @swagger
 * /api/wlcs:
 *  post:
 *      summary: Se crea un nuevo Wireless Controller en una red.
 *      tags: [Wlcs]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/wlc'
 *      responses:
 *          '200':
 *              description: Se han creado un nuevo Wireless Controller en la red.
 *          '500':
 *              description: Hubo un error al crear un nuevo Wireless Controller en la red.
 */
router.post('/api/wlcs', wlcsController.create);

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
router.get('/api/wlcs', wlcsController.findAll);

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
router.get('/api/network/:network_id/wlcs', wlcsController.findByNetwork);

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
router.get('/api/wlc/:wlc_id', wlcsController.findOne);

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
router.delete('/api/wlcs/:mac', wlcsController.delete);

/**
 * @swagger
 * /api/wlcs/:mac:
 *  update:
 *      summary: Se actualiza la informacion de un wlc.
 *      tags: [Wlcs]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          manufacter_name:
 *                              type: string
 *                              description: Nombre del proveedor.
 *                          product_name:
 *                              type: string
 *                              description: Nombre del producto.
 *      responses:
 *          '200':
 *              description: Se ha actualizado la informacion del wlc correctamente.
 *          '500':
 *              description: Hubo un error al actualizar la informacion del wlc.
 */
router.put('/api/wlcs/:mac', wlcsController.update);

module.exports = router