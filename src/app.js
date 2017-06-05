import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import facebook from './facebook';
import config from './config';
import { ValidateSignature } from 'fb-messenger-es6';

const app = express();
app.disable('x-powered-by');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const validator = new ValidateSignature(config.facebook.appSecret);
app.post('/webhook', bodyParser.json({ verify: (req, res, bf) => validator.validate(req, res, bf) }));
app.use('/facebook', facebook);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
