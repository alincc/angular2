import 'angular2-universal-polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {enableProdMode} from '@angular/core';
import {createEngine} from 'angular2-express-engine';
enableProdMode();
const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
//Client app
import {MainModule} from './main.node';

// Express View
app.engine('.html', createEngine({}));
app.set('views', __dirname);
app.set('view engine', 'html');
app.use(bodyParser.json());

app.use(express.static(path.join(ROOT, './dist'), {index: false}));

//Server Urls
//S3 signing signature
import {S3signatureHandler, ApiAccessTokenHandler, ApiRefreshTokenHandler} from './backend/request-handlers';
app.get('/s3-sign', S3signatureHandler);
app.get('/access-token', ApiAccessTokenHandler);
app.post('/refresh-token', ApiRefreshTokenHandler);

function ngApp(req, res) {
  res.render('index', {
    req,
    res,
    ngModule: MainModule,
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: req.hostname
  });
}

app.get('/', ngApp);
app.get('/login', ngApp);
app.get('/signup', ngApp);
app.get('/forgotPassword', ngApp);
app.get('/verify-account', ngApp);
app.get('/verify-account/phone', ngApp);
app.get('/verify-account/medical-license', ngApp);
app.get('/verify-account/national-id', ngApp);
app.get('/dashboard/profile', ngApp);
app.get('/dashboard/practices', ngApp);
app.get('/dashboard/practices/:id', ngApp);
app.get('/privacy-policy', ngApp);
app.get('/terms-of-use', ngApp);

// Server
let server = app.listen(process.env.PORT || 4000, () => {
  console.log('Listening on: http://localhost:4000');
});
