// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyAlw-EQhTiALtV0a9yHk3TtrhbCTjtGPVg",
    authDomain: "overchain-72ddf.firebaseapp.com",
    databaseURL: "https://overchain-72ddf-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "overchain-72ddf",
    storageBucket: "overchain-72ddf.appspot.com",
    messagingSenderId: "372312319901",
    appId: "1:372312319901:web:f85452f9fe24519e13f174",
    measurementId: "G-SBN7FNGBKB"
  },

  apis : {
    retries: 2, 
    usersSerice: "http://localhost:3000",
     
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
