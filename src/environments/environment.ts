/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBxrpPVOoMUyMj0LUGj0t4lK1jgwnAriUo',
    authDomain: 'trust-credit.firebaseapp.com',
    databaseURL: 'https://trust-credit.firebaseio.com',
    projectId: 'trust-credit',
    storageBucket: 'trust-credit.appspot.com',
    messagingSenderId: '898610012608',
    appId: '1:898610012608:web:1206ec8257c7379914a825',
    measurementId: 'G-GW633GXDNV',
  },
};
