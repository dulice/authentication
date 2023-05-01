import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import helmet from 'helmet';
import path from 'path';

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.error(err);
  });

app.use('/api/user', userRoute);
app.listen(process.env.PORT);

const _variabelOfChoice = path.resolve();
app.use(express.static(path.join(_variabelOfChoice, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(_variabelOfChoice, '/client/build/index.html'));
});
app.use((err, req, res, next) => {
  res.status(500).json({message: err.message});
});
