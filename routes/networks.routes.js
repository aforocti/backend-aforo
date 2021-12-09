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
const networksController = require('../controllers/networks.controller.js');

/**
 * @swagger
 * /api/networks:
 *  post:
 *      summary: Crear una red y genera un token de red.
 *      tags: [Networks]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Nombre de la nueva red.
 *      responses:
 *          '200':
 *              description: Se ha creado una nueva red.
 *          '500':
 *              description: Hubo un error al crear la red.
 */
router.post('/api/networks', networksController.create);

/**
 * @swagger
 * /api/networks/:token:
 *  get:
 *      summary: Lee una red a partir de un token  
 *      tags: [Networks]
 *      parameters:
 *          - in: path
 *            name: token
 *            schema:
 *              type: string
 *              required: true
 *            description: Token de la red.
 *      responses:
 *          '200':
 *              description: Se ha leido la informacion de la red correctamente.
 *          '500':
 *              description: Hubo un error al leer la informacion de la red.
 */
router.get('/api/networks/:token', networksController.findOne);

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
router.get('/api/networks', networksController.findAll);

module.exports = router