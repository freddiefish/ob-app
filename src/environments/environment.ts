// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: '',
    authDomain: 'ob-app-dev-252415.firebaseapp.com',
    databaseURL: 'https://ob-app-dev-252415.firebaseio.com',
    projectId: 'ob-app-dev-252415',
    storageBucket: 'ob-app-dev-252415.appspot.com',
    messagingSenderId: '1024346721563',
    appId: '1:1024346721563:web:da1b5efcc22d17ef18d7be'
  },
  api: 'http://localhost:8080/api/email.php'
  // api: 'https://ob-app-dev-252415.appspot.com/api/email'
};
