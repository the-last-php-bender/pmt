/**
 * @swagger
 * tags:
 *   name: Company
 *   description: API endpoints related to companies.
 */

/**
 * @swagger
 * /company:
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tech Solutions"
 *               email:
 *                 type: string
 *                 example: "info@techsolutions.com"
 *               role:
 *                 type: string
 *                 example: "company"
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "63d4f7a3c8e4b3218f8b4567"
 *                     companyName:
 *                       type: string
 *                       example: "Tech Solutions"
 *                     cEmail:
 *                       type: string
 *                       example: "info@techsolutions.com"
 *                     role:
 *                       type: string
 *                       example: "company"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /company:
 *   get:
 *     summary: Retrieve company details
 *     tags: [Company]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Company details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "63d4f7a3c8e4b3218f8b4567"
 *                     companyName:
 *                       type: string
 *                       example: "Tech Solutions"
 *                     cEmail:
 *                       type: string
 *                       example: "info@techsolutions.com"
 *                     role:
 *                       type: string
 *                       example: "company"
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /company/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Company]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "63d4f7a3c8e4b3218f8b4567"
 *                   uName:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /company/{id}:
 *   put:
 *     summary: Update company details
 *     tags: [Company]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d4f7a3c8e4b3218f8b4567"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: "Tech Innovations"
 *               cEmail:
 *                 type: string
 *                 example: "info@techinnovations.com"
 *               oldPassword:
 *                 type: string
 *                 example: "oldPassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /company/request/{userId}/{companyId}:
 *   get:
 *     summary: Update user-company request status
 *     tags: [Company]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d4f7a3c8e4b3218f8b4567"
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: string
 *           example: "63d4f7a3c8e4b3218f8b4567"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [accepted, rejected]
 *                 example: "accepted"
 *     responses:
 *       200:
 *         description: Request status updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Request not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /company/request:
 *   post:
 *     summary: Request to join a company
 *     tags: [Company]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cKey:
 *                 type: string
 *                 example: "companyKey123"
 *     responses:
 *       201:
 *         description: Request created successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */
