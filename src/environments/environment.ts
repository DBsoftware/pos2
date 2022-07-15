// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// iframes: 'http://209.46.35.213:8090', // QA



export const environment = {
  production: false,
  //  API_URL: 'http://66.179.57.52:2039/NmcServerS/nmc-server/post' // QA
   API_URL: "https://aiodc.com:8020/NmcServerS/nmc-server/post/" // PRO
   //  API_URL: 'http://186.81.241.19:6040/NmcServerS/nmc-server/post' // development

  };


  // API_URL: 'http://66.179.57.52:2029/NmcServerS/nmc-server/post/' // QA
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
