/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uName
 *               - email
 *               - password
 *             properties:
 *               uName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 *       409:
 *         description: Conflict - User with this email already exists
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /users/company:
 *   get:
 *     summary: Get companies associated with the current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of companies the user is associated with
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c72ef2f8fb814d7c5f80b"
 *                   name:
 *                     type: string
 *                     example: "Tech Innovations"
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /users/role:
 *   put:
 *     summary: Update user role in the company
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [lead, user]
 *                 example: "lead"
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Bad Request - Invalid role specified
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - Not authorized to perform this action
 *       404:
 *         description: Not Found - User or company not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get current user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72ef2f8fb814d7c5f80b"
 *                 uName:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 example: "oldpassword123"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "newpassword123"
 *               uName:
 *                 type: string
 *                 example: "John Smith"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.smith@example.com"
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       400:
 *         description: Bad Request - Invalid input
 *       401:
 *         description: Unauthorized - Old password is incorrect
 *       404:
 *         description: Not Found - User not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "605c72ef2f8fb814d7c5f80b"
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       400:
 *         description: Bad Request - Unauthorized action
 *       404:
 *         description: Not Found - User or associated records not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /users/company/users:
 *   get:
 *     summary: Get all users for a company
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users in the company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c72ef2f8fb814d7c5f80b"
 *                   uName:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *       401:
 *         description: Unauthorized - User not authenticated
 *       403:
 *         description: Forbidden - Not authorized to perform this action
 *       500:
 *         description: Server Error
 */
