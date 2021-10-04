var express = require('express');
var router = express.Router();

const authController = require('../api/controllers/auth_controller');

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Signup
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First Name.
 *                 example: User
 *               lastName:
 *                 type: string
 *                 description: Last Name.
 *                 example: User
 *               email:
 *                 type: string
 *                 description: Email.
 *                 example: user@mailinator.com
 *               password:
 *                 type: string
 *                 description: Password.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: boolean
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                 message:
 *                   type: boolean
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: email
 *                 description: Email.
 *                 example: user@mailinator.com
 *               password:
 *                 type: string
 *                 description: Password.
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                 message:
 *                   type: boolean
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                 message:
 *                   type: boolean
 */
router.post('/login', authController.emailLogin);

module.exports = router;
