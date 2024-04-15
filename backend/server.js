import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import MainRouter from "./router/MainRouter.js"
import { invalid } from "./middlewares/invalid.js"
import { errorHandler } from "./middlewares/errorHandler.js"

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017';
const Frontport = process.env.Frontport || 3000

app.use(morgan(`dev`));
app.use(cors({credentials: true, origin: `http://localhost:${Frontport}`}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use("/", MainRouter)
app.use("*", invalid)
app.use(errorHandler)

mongoose.connect(MONGO_DB_URI)
  .then(() => {
    console.log('MongoDB verbunden');
    app.listen(PORT, () => {
      console.log(`Server läuft auf http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Fehler bei der Verbindung mit MongoDB:', error);
  });

mongoose.connection.on('error', (error) => {
  console.error('Fehler bei der Verbindung zur Datenbank:', error);
});