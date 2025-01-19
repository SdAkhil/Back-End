import { Router } from 'express';
import prisma from '../prisma';

const router = Router();

/**
 * GET /tasks
 * Returns all tasks, sorted by newest first.
 */
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching tasks' });
  }
});

/**
 * GET /tasks/:id
 * Returns a single task by ID.
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching task' });
  }
});

/**
 * POST /tasks
 * Creates a new task with a title and optional color.
 */
router.post('/', async (req, res) => {
  const { title, color } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = await prisma.task.create({
      data: { title, color },
    });
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating task' });
  }
});

/**
 * PUT /tasks/:id
 * Updates an existing task (title, color, completed).
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, color, completed },
    });
    return res.json(updatedTask);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating task' });
  }
});

/**
 * DELETE /tasks/:id
 * Deletes an existing task.
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting task' });
  }
});

export default router;
