/**
 * @openapi
 * tags:
 *   - name: Projects
 *     description: Operations related to projects.
 */

/**
 * @openapi
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project within the specified company.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Project Title"
 *               description:
 *                 type: string
 *                 example: "Project Description"
 *               companyId:
 *                 type: string
 *                 example: "605c72efc0b3b4d1b2f3e4a1"
 *               status:
 *                 type: string
 *                 enum: [opened, closed]
 *                 example: "opened"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *     responses:
 *       '201':
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72efc0b3b4d1b2f3e4a2"
 *                 title:
 *                   type: string
 *                   example: "Project Title"
 *                 description:
 *                   type: string
 *                   example: "Project Description"
 *                 companyId:
 *                   type: string
 *                   example: "605c72efc0b3b4d1b2f3e4a1"
 *                 status:
 *                   type: string
 *                   example: "opened"
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-01-01"
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *       '400':
 *         description: Bad request, missing required fields
 *       '404':
 *         description: Company not found
 */

/**
 * @openapi
 * /projects:
 *   get:
 *     summary: Get all projects for a company
 *     description: Retrieve all projects associated with the authenticated company.
 *     tags:
 *       - Projects
 *     responses:
 *       '200':
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "605c72efc0b3b4d1b2f3e4a2"
 *                   title:
 *                     type: string
 *                     example: "Project Title"
 *                   description:
 *                     type: string
 *                     example: "Project Description"
 *                   status:
 *                     type: string
 *                     example: "opened"
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-01"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     example: "2024-12-31"
 *       '401':
 *         description: Not authenticated
 *       '404':
 *         description: No projects found
 */

/**
 * @openapi
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Retrieve detailed information about a specific project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the project
 *         schema:
 *           type: string
 *           example: "605c72efc0b3b4d1b2f3e4a2"
 *     responses:
 *       '200':
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72efc0b3b4d1b2f3e4a2"
 *                 title:
 *                   type: string
 *                   example: "Project Title"
 *                 description:
 *                   type: string
 *                   example: "Project Description"
 *                 companyId:
 *                   type: string
 *                   example: "605c72efc0b3b4d1b2f3e4a1"
 *                 status:
 *                   type: string
 *                   example: "opened"
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-01-01"
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *       '404':
 *         description: Project not found
 */

/**
 * @openapi
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     description: Update the details of an existing project.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the project
 *         schema:
 *           type: string
 *           example: "605c72efc0b3b4d1b2f3e4a2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Project Title"
 *               description:
 *                 type: string
 *                 example: "Updated Project Description"
 *               companyId:
 *                 type: string
 *                 example: "605c72efc0b3b4d1b2f3e4a1"
 *               status:
 *                 type: string
 *                 enum: [opened, closed]
 *                 example: "closed"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31"
 *     responses:
 *       '200':
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72efc0b3b4d1b2f3e4a2"
 *                 title:
 *                   type: string
 *                   example: "Updated Project Title"
 *                 description:
 *                   type: string
 *                   example: "Updated Project Description"
 *                 companyId:
 *                   type: string
 *                   example: "605c72efc0b3b4d1b2f3e4a1"
 *                 status:
 *                   type: string
 *                   example: "closed"
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-01-01"
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *       '400':
 *         description: Bad request, invalid parameters
 *       '404':
 *         description: Project not found
 */

/**
 * @openapi
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     description: Soft delete a project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the project
 *         schema:
 *           type: string
 *           example: "605c72efc0b3b4d1b2f3e4a2"
 *     responses:
 *       '204':
 *         description: Project deleted successfully
 *       '404':
 *         description: Project not found
 */

/**
 * @openapi
 * /projects/{id}/restore:
 *   post:
 *     summary: Restore a soft-deleted project
 *     description: Restore a project that was previously soft deleted.
 *     tags:
 *       - Projects
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the project
 *         schema:
 *           type: string
 *           example: "605c72efc0b3b4d1b2f3e4a2"
 *     responses:
 *       '200':
 *         description: Project restored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72efc0b3b4d1b2f3e4a2"
 *                 title:
 *                   type: string
 *                   example: "Restored Project Title"
 *                 description:
 *                   type: string
 *                   example: "Restored Project Description"
 *                 companyId:
 *                   type: string
 *                   example: "605c72efc0b3b4d1b2f3e4a1"
 *                 status:
 *                   type: string
 *                   example: "opened"
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-01-01"
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31"
 *       '404':
 *         description: Project not found
 */
