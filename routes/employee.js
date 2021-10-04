const express = require('express');
const router = express.Router();
const middleware = require('../api/common/middleware');

const employeeController = require('../api/controllers/employee_controller');
/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Add employee
 *     tags:
 *       - Employee
 *     security:
 *	     - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *                 description: Employee id.
 *                 example: AQET884L4
 *               name:
 *                 type: string
 *                 description: Name.
 *                 example: Employee
 *               phoneCode:
 *                 type: string
 *                 description: Phone Code.
 *                 example: +91
 *               phone:
 *                 type: string
 *                 description: Phone.
 *                 example: 9846400000
 *               email:
 *                 type: string
 *                 description: Email.
 *                 example: employee@mailinator.com
 *               address:
 *                 type: string
 *                 description: Address.
 *                 example: 711-2880 Nulla St. Mankato Mississippi 96522
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
router.post('/', middleware.authenticate, employeeController.insertRecord);

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Get employees
 *     tags:
 *       - Employee
 *     security:
 *	     - Authorization: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: query
 *         required: false
 *         in: query
 *         type: string
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
router.get('/', middleware.authenticate, employeeController.findAllRecords);

/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     summary: Update employee
 *     tags:
 *       - Employee
 *     security:
 *	     - Authorization: []
 *     parameters:
 *       - name: id
 *         description: ID
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name.
 *                 example: Employee
 *               phone_code:
 *                 type: string
 *                 description: Phone Code.
 *                 example: +91
 *               phone:
 *                 type: string
 *                 description: Phone.
 *                 example: 9846400000
 *               email:
 *                 type: string
 *                 description: Email.
 *                 example: employee@mailinator.com
 *               address:
 *                 type: string
 *                 description: Address.
 *                 example: 711-2880 Nulla St. Mankato Mississippi 96522
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
router.put('/:id', middleware.authenticate, employeeController.updateRecord);

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Delete employee
 *     tags:
 *       - Employee
 *     security:
 *	     - Authorization: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID
 *         in: path
 *         required: true
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
router.delete('/:id', middleware.authenticate, employeeController.deleteRecord);

module.exports = router;
