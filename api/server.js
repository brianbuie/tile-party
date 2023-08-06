/*
  Express init
*/
import express from 'express';
import helmet from 'helmet';
import 'express-async-errors';
const app = express();
app.use(helmet());

/*
  Database Connect
*/
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;
mongoose.set('toJSON', { virtuals: true });
mongoose.set('toObject', { virtuals: true });
mongoose.connection.on('error', console.error);

/*
  Request parsing
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*
  Redirect to https
*/
app.use((req, res, next) => {
  const notProd = process.env.NODE_ENV !== 'production';
  const isLocalhost = req.socket.localAddress === req.socket.remoteAddress;
  const isHttps = req.header('x-forwarded-proto') === 'https';
  if (notProd || isLocalhost || isHttps) return next();
  res.redirect(`https://${req.header('host')}${req.url}`);
});

/*
  App
*/
import router from './router';
app.use('/api', router);

/*
  Static files or send to client
*/
import path from 'path';
app.use(express.static(path.join(__dirname, '../.build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../.build/index.html')));

/*
  Listen
*/
const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
