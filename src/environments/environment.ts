// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC65RePE8c-3fPj_s8yQsNWyLRdjcSYG4g',
    authDomain: 'dht-viet.firebaseapp.com',
    databaseURL: 'https://dht-viet.firebaseio.com',
    projectId: 'dht-viet',
    storageBucket: 'dht-viet.appspot.com',
    messagingSenderId: '618889869269',
    appId: '1:618889869269:web:1c103e03cfdcd3a78c6f5c'
  },
  apiBase: 'https://us-central1-silverbullet-sandbox.cloudfunctions.net/api/'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
