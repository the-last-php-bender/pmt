/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Task Title"
 *               description:
 *                 type: string
 *                 example: "Task Description"
 *               status:
 *                 type: string
 *                 enum: [open, in-progress, completed]
 *                 example: "open"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: "medium"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-31"
 *               projectId:
 *                 type: string
 *                 example: "605c72ef2f8fb814d7c5f80b"
 *               assigneeId:
 *                 type: string
 *                 example: "605c72ef2f8fb814d7c5f80c"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the task to retrieve
 *     responses:
 *       200:
 *         description: Task data including comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "Task Title"
 *                 description:
 *                   type: string
 *                   example: "Task Description"
 *                 status:
 *                   type: string
 *                   example: "open"
 *                 priority:
 *                   type: string
 *                   example: "medium"
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-08-31"
 *                 projectId:
 *                   type: string
 *                   example: "605c72ef2f8fb814d7c5f80b"
 *                 assigneeId:
 *                   type: string
 *                   example: "605c72ef2f8fb814d7c5f80c"
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       content:
 *                         type: string
 *                         example: "This is a comment"
 *                       user:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                           email:
 *                             type: string
 *                             example: "johndoe@example.com"
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Task Title"
 *               description:
 *                 type: string
 *                 example: "Updated Task Description"
 *               status:
 *                 type: string
 *                 enum: [open, in-progress, completed]
 *                 example: "in-progress"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: "high"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-09-30"
 *               assigneeId:
 *                 type: string
 *                 example: "605c72ef2f8fb814d7c5f80c"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the task to delete
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server Error
 */
