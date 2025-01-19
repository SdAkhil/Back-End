import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', tasksRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
