// backend/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Authenticate all routes below this middleware

router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
