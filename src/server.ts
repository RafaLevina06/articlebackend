import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';
import { Routes } from './routes/Routes';

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors())

app.use('/article', bodyParser.json(), Routes)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});