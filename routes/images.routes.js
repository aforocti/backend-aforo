/**
 * @swagger
 * tags:
 *  name: Images
 *  description: Operaciones para el almacenamiento de url de imagenes.
 */
const { Router } = require('express')
const router = Router();
const imagesController = require('../controllers/images.controller.js');

/**
 * @swagger
 * /api/network/{network_id}/images:
 *  get:
 *      summary: Lee las imagenes de una red.
 *      tags: [Images]         
 *      parameters:
 *          - in: path
 *            name: network_id
 *            schema:
 *              type: string
 *              required: true
 *            description: Id de la red.
 *      responses:
 *          '200':
 *              description: Se han leido todas las imagenes de la red.
 *          '500':
 *              description: Hubo un error al leer las imagenes de la red.
 */
router.get('/api/network/:network_id/images', imagesController.findbyNetwork);

/**
 * @swagger
 * /api/network/{network_id}/images/{piso}:
 *  get:
 *      summary: Lee las imagenes de una red en un piso determinado.
 *      tags: [Images]
 *      parameters:
 *          - in: path
 *            name: network_id
 *            schema:
 *              type: string
 *              required: true
 *            description: Id de la red.
 *          - in: path
 *            name: piso
 *            schema:
 *              type: string
 *              required: true
 *            description: Piso al que pertenece la imagen.
 *      responses:
 *          '200':
 *              description: Se han leido la imagen correctamente.
 *          '500':
 *              description: Hubo un error al leer la imagen.
 */
router.get('/api/network/:network_id/images/:piso', imagesController.findByPiso);

/**
 * @swagger
 * /api/network/{network_id}/images:
 *  post:
 *      summary: Se añade el url de la imagen del plano de una red.
 *      tags: [Images]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          url:
 *                              type: string
 *                              description: Url de la imagen.
 *      parameters:
 *          - in: path
 *            name: network_id
 *            schema:
 *              type: string
 *              required: true
 *            description: Id de la red.
 *      responses:
 *          '200':
 *              description: Se ha agregado la url de la imagen.
 *          '500':
 *              description: Hubo un error al agregar la url de la imagen.
 */
 router.post('/api/network/:network_id/images', imagesController.create);

/**
 * @swagger
 * /api/network/{network_id}/images/url:
 *  put:
 *      summary: Actualiza la url de la imagen del plano de la red en un piso determinado.
 *      tags: [Images]
 *      parameters:
 *          - in: path
 *            name: network_id
 *            schema:
 *              type: string
 *              required: true
 *            description: Id de la red.
 *      responses:
 *          '200':
 *              description: Se ha actualizado la url de la imagen correctamente.
 *          '500':
 *              description: Hubo un error al actualizar la imagen.
 */
router.put('/api/network/:network_id/images/url', imagesController.update);

module.exports = router