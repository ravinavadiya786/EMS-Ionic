# Education Management Softwear

1. git clone https://github.com/ravinavadiya786/EMS-Ionic.git

2. cd EMS-Ionic

3. npm i

4. ionic platform add android

5. ionic cordova build android

## Development server

Run `ng serve` or `ng serve -aot` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

ionic cordova build android


##  Relaseing the playstore

1. ionic cordova build android --prod --release

2. copy the /EMS-Ionic/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
to /EMS-Ionic

3. open /EMS-Ionic Terminal :- jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ems.keystore app-release-unsigned.apk alias_name

4.zipalign -v 4 app-release-unsigned.apk  ems.apk

Refresn this https://ionicframework.com/docs/deployment/play-store
