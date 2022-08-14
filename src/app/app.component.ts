import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {  Platform } from '@ionic/angular';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';


;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

/*c
    const express = require('express');
    const cors = require('cors');
    const app = express();

    const allowedOrigins = [
      'capacitor://localhost',
      'ionic://localhost',
      'http://localhost',
      'http://localhost:8080',
      'http://localhost:8100',
    ];

    // Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
    const corsOptions = {
      origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Origin not allowed by CORS'));
        }
      },
    };

    // Enable preflight requests for all routes
    app.options('*', cors(corsOptions));

    app.get('/', cors(corsOptions), (req, res, next) => {
      res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
    });

    app.listen(3000, () => {
      console.log('CORS-enabled web server listening on port 3000');
    });
    */
  }


}
