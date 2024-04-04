import express from 'express';
import bodyParser from 'body-parser';
import todosRoutes from './routes/todos';
const port = 3000;

const app = express();

app.use(bodyParser.json(), todosRoutes);

app.listen({ port })
