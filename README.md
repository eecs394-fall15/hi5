# Hi5
### Awesomeness Anywhere.

Hi5 is an app that allows anyone to enjoy the satisfaction of a good ol' highfive anywhere at any time.

Built as a hybrid app, Hi5 has the components of a web app and a native app and can be run on both iOS and Android.

## Installation as a User
To install and use Hi5, the [AppGyver Scanner App](https://itunes.apple.com/us/app/appgyver-scanner/id575076515?mt=8) must be installed onto a mobile device. The scanner can then be used to [install and run Hi5 via QR code.](https://share.appgyver.com/?id=85764&hash=64a8c1027f8060ac2fc6c206639e91e022839b8ce03786f9fe8304ccf18ae54f)

## Installation as a Developer
If you wish to install Hi5 for development purposes, the app can be cloned from this repository. Furthermore, an AppGyver account will be needed and the Steroids and Supersonic clients must be installed. [Register for Appgyver and install Steroids/Supersonic here.](http://www.appgyver.io/steroids/getting_started)

## Dependencies
Hi5 runs on [Node.js v4.2.2](https://nodejs.org/en/download/) and [AngularJS v1.4.8.](https://angularjs.org/)

Once the Steroids client Node.js and AngularJS are set up, The rest of the dependencies can be installed by running the command `steroids update`.

If that fails, manually run both `npm install` and `bower install`.

## Running the app
The app can be run on a localhost Node.js server through the Steroids Client by running `steroids connect`. This will pop up a QR code that can be scanned to run a local version of the app. The Steroids dashboard will also be accessible on the page that pops up.

## Initializing a Database and Integrating Parse
Hi5 relies on [Parse](https://parse.com) as a backend and database. Register for an account on the Parse website and create a new app named "Hi5".

In the app control panel, navigate to the "Settings" tab and click "Keys". You will find an "Application ID", "Javascript Key", and a "Master Key".

In the Steroids Dashboard, navigate to the data tab and click "Initialize data". Create a new data source and select Parse. Use these keys to fill in the corresponding fields in the dashboard.

Also be sure to copy and paste the keys into their corresponding spots in the file Parse.js (hi5/app/common/scripts/Parse.js):

```
angular
  .module('common')
  .factory('Parse', function () {
    Parse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY", "MASTER_KEY");
    return Parse;
});
```


Create corresponding Parse class for each class defined in /app/common/scripts/Models.js with columns representing each property. In the Steroids dashboard, you will need to create a data resource for each Parse class to link the database Note that the endpoint field needed is the last part of the URL when you create a class on Parse. For the "User" class, it will always be "\_User" because it is a specially defined class.

## Deploying the app
Hi5 can be deployed via QR code to other people through the Steroids dashboard. Simply navigate to the Cloud tab and click "Deploy". Next, click "Cloud share". This will bring up a page which has a shareable URL that will provide anyone with the necessary QR code to run the app.

## Platform and App Constraints and Limitations
Several constraints were placed on the developer team because of the chosen frameworks and platforms. Most notably, the developer team has had trouble adapting push notifications to the application after trying a number of methods including Parse push notifications.

Another noteworthy constraint is a lack of effective 3-way-databinding in Steroids, leading to the use of long polling to query a user's inbox. 

Lastly, the constraint of Steroid's lack of collaborative settings leads to each developer having to manually maintain and synchronize his or her local versions of the data resources. The cloud.json and cloud-resources.raml have been **intentionally** placed in the .gitignore.

*Pushing and pulling the cloud.json and cloud-resources.raml is not a good idea. It _will_ break the app*

## Problems?
Feel free to submit any issues via Github issues!

## Contributors
Hi5 was developed by  Northwestern students as a part of EECS 394, Software Projects Management and Development, and MPD 405, Software Product Design and Development:

Developer Team: Adel Lahlou, Aaron Leon, Michael Horst, Philip Lan

MPD Team: Brian Kenny, Jacob Viner, Joe Luciani, Karin O'Connor, Michael Gundlach, Russ Dusza, Tom Marchese

## Special Thanks
A shoutout to Professor Christopher Riesbeck of Northwestern University for feedback and advising throughout the development of Hi5.
