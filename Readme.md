# iadbox Cordova Sample App

This is a Sample Cordova App you can use to see how to integrate [iadbox-cordova-plugin](https://github.com/iadbox/iadbox-cordova-plugin) into your App. Or even start an App from zero with this template.

For more info on iadbox check http://www.iadbox.com

## How to create your own App

Clone this repo and remove .git folder.

```bash
$ git clone https://github.com/iadbox/iadbox-cordova-app.git name-of-your-app
$ cd name-of-your-app
$ rm -rf .git
```

Edit config.xml file and change id, version, name, author and description.

Rebuild Android and iOS source files with new data. To do so, you need to remove and add both platforms with the cordova cli.

```bash
$ cordova platform rm ios
$ cordova platform add ios

$ cordova platform rm android
$ cordova platform add android@6.2.2
```

After this command you will receive an error while trying to install iadbox-cordova-plugin. So you will need to install it manually with the --force parameter.

```bash
$ cordova plugin rm iadbox-cordova-plugin --save && cordova plugin add iadbox-cordova-plugin --save --force
```

And there is only one plugin left to install.

```bash
$ cordova plugin add phonegap-plugin-push --save
```

Once everything is set up, you need to create your own icon and splash images. A simple way to do it is using [splashicon-generator](https://github.com/eberlitz/splashicon-generator) (it uses imagemagick). Change the images under /model directory and run the following commands.

```bash
$ npm install splashicon-generator -g
$ splashicon-generator
$ cp -r res/* platforms/android/res
$ cp res/screens/android/screen-mdpi-portrait.png www/img/logo_200.png && cp res/screens/android/screen-mdpi-portrait.png www/img/logo_320.png && cp res/screens/android/screen-hdpi-portrait.png www/img/logo_480.png && cp res/screens/android/screen-xhdpi-portrait.png www/img/logo_720.png && cp res/screens/android/screen-xxhdpi-portrait.png www/img/logo_960.png && cp res/screens/android/screen-xxxhdpi-portrait.png www/img/logo_1280.png
```

Change the affiliate_id in www/js/index.js and ...

And that's all! You can now build and test your app.
