/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Operaciones para los usuarios.
 */

const { Router } = require('express')
const router = Router();
const usersController = require('../controllers/users.controller.js');

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Se crea un nuevo usuario en una red.
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user:
 *                              type: string
 *                              description: Id de Usuario a crear.
 *                          network_id:
 *                              type: string
 *                              description: Id de la red.
 *      responses:
 *          '200':
 *              description: Se han creado un nuevo usuario del sistema.
 *          '500':
 *              description: Hubo un error al crear un nuevo usuario en el sistema.
 */
router.post('/api/users', usersController.create);

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Lee todos los usuarios del sistema.
 *      tags: [Users]
 *      responses:
 *          '200':
 *              description: Se han leido todos los usuarios del sistema.
 *          '500':
 *              description: Hubo un error al leer los usuarios del sistema.
 */
 router.get('/api/users', usersController.findAll);

/**
 * @swagger
 * /api/network/:network_id/users:
 *  get:
 *      summary: Lee los usuarios conectados a una red.
 *      tags: [Users]
 *      responses:
 *          '200':
 *              description: Se han leido todos los usuarios de la red.
 *          '500':
 *              description: Hubo un error al leer los usuarios de la red.
 */
router.get('/api/network/:network_id/users', usersController.findByNetwork);

/**
 * @swagger
 * /api/name/:name/users:
 *  get:
 *      summary: Lee un usuario y su red a partir de su nombre.
 *      tags: [Users]
 *      responses:
 *          '200':
 *              description: Se han leido el usuario correctamente.
 *          '500':
 *              description: Hubo un error al leer el usuario.
 */
router.get('/api/name/:name/users', usersController.findOne);

// // Delete User
// router.delete('/api/users/:mac', (req, res) => {
//     (async () => {
//         try {
//             const doc = db.collection('Users').doc(req.params.mac);
//             await doc.delete();
//             return res.status(200).json();
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error)
//         }
//     })();
// });

// // Update User
// router.put('/api/users/:mac', (req, res) => {
//     (async () => {
//         try {
//             const doc = db.collection('Users').doc(req.params.mac);
//             await doc.update({
//                 manufacturer_name: req.body.manufacturer_name,
//                 product_name:      req.body.product_name
//             });
//             return res.status(200).json();
//         } catch (error) {
//             console.log(error);
//             return res.status(500).send(error)
//         }
//     })();
// });

module.exports = router