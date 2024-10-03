/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login user or company
 *     description: Authenticate a user or company and return a JWT token.
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
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [user, company, superadmin]
 *                 example: company
 *             required:
 *               - email
 *               - password
 *               - role
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '400':
 *         description: Bad request, missing parameters or invalid role
 *       '401':
 *         description: Unauthorized, invalid email or password
 */
